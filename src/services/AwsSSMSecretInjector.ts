import { Secret } from '../entities/Secret';
import { SecretInjector } from './SecretInjector';
import { GetParameterCommand, SSMClient, SSMClientConfig } from '@aws-sdk/client-ssm';

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

  private async retrieveParam(key: string, withDecryption: boolean) {
    const param = await this.ssm.send(
      new GetParameterCommand({
        Name: key,
        WithDecryption: withDecryption,
      })
    );
    const value = param.Parameter?.Value;
    if (!value) throw new Error(`Parameter ${key} not found on ssm`);
    return value;
  }

  async pullSecrets(): Promise<Array<Secret>> {
    const secrets: Array<Secret> = [];
    for (const variable of this.config.variables) {
      const value = await this.retrieveParam(variable.path, !!variable.secret);
      secrets.push(new Secret(variable.name, value));
    }
    return secrets;
  }
}
