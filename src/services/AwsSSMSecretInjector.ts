import { Secret } from '../entities/Secret';
import { SecretInjector } from './SecretInjector';
import { GetParametersCommand, SSMClient, SSMClientConfig } from '@aws-sdk/client-ssm';

interface SSMVariable {
  name: string;
  path: string;
  secret?: boolean;
}

export interface Config {
  clientConfig?: SSMClientConfig;
  variables: Array<SSMVariable>;
}

export class AwsSSMSecretInjector extends SecretInjector {
  private ssm: SSMClient;

  constructor(private config: Config) {
    super();
    this.ssm = new SSMClient(config.clientConfig || {});
  }

  private async retrieveParams(variables: Array<SSMVariable>, withDecryption: boolean) {
    if (!variables.length) return [];

    const params = await this.ssm.send(
      new GetParametersCommand({
        Names: variables.map((entry) => entry.path),
        WithDecryption: withDecryption,
      })
    );

    if (!params.Parameters || params.Parameters.length !== variables.length) {
      let missingParam = '';
      for (const variable of variables) {
        if (!params.Parameters?.some((param) => param.Name === variable.path)) missingParam = variable.name;
      }
      throw new Error(`Missing ssm variable ${missingParam}`);
    }
    return params.Parameters;
  }

  async pullSecrets(): Promise<Array<Secret>> {
    const secrets: Array<Secret> = [];
    const encryptedVars: Array<SSMVariable> = [];
    const nonEncryptedVars: Array<SSMVariable> = [];

    const pathToNameMap = new Map<string, string>();

    for (const entry of this.config.variables) {
      pathToNameMap.set(entry.path, entry.name);

      if (entry.secret) {
        encryptedVars.push(entry);
      } else {
        nonEncryptedVars.push(entry);
      }
    }

    const variables = (
      await Promise.all([this.retrieveParams(nonEncryptedVars, false), this.retrieveParams(encryptedVars, true)])
    ).flat();

    for (const variable of variables) {
      if (variable.Name && variable.Value) {
        const name = pathToNameMap.get(variable.Name);
        if (name) secrets.push(new Secret(name, variable.Value));
      }
    }

    return secrets;
  }
}
