import { Secret } from '../entities/Secret';
import { SecretInjector } from './SecretInjector';

export interface Config {
  path?: string;
}

export class DotEnvSecretInjector extends SecretInjector {
  constructor(private config: Config) {
    super();
  }

  async pullSecrets(): Promise<Array<Secret>> {
    const vars: Record<string, string> = {};
    (await import('dotenv')).config({
      processEnv: vars,
      path: this.config.path,
    });
    const secrets: Array<Secret> = [];
    for (const [key, value] of Object.entries(vars)) {
      secrets.push(new Secret(key, value));
    }
    return secrets;
  }
}
