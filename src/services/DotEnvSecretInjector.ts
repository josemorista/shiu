import { readFile } from 'node:fs/promises';
import { Secret } from '../entities/Secret';
import { SecretInjector } from './SecretInjector';
import { parse } from 'dotenv';

export interface Config {
  path?: string;
}

export class DotEnvSecretInjector extends SecretInjector {
  constructor(private config: Config) {
    super();
  }

  async pullSecrets(): Promise<Array<Secret>> {
    const vars = parse(await readFile(this.config.path || '.env'));
    const secrets: Array<Secret> = [];
    for (const [key, value] of Object.entries(vars)) {
      secrets.push(new Secret(key, value));
    }
    return secrets;
  }
}
