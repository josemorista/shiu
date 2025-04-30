import { join } from 'path';
import { ConfigFile } from '../entities/ConfigFile';
import { SecretInjectorComposer } from '../services/SecretInjectorComposer';
import { AwsSSMSecretInjector } from '../services/AwsSSMSecretInjector';
import { DotEnvSecretInjector } from '../services/DotEnvSecretInjector';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';

export class CreateInjector {
  private getDir() {
    return process.env.PWD || '.';
  }

  private async readConfigFile(configFile?: string) {
    if (configFile) return readFile(join(this.getDir(), configFile), 'utf8');
    try {
      return await readFile(join(this.getDir(), 'shiu-config.yml'), 'utf8');
    } catch {
      return readFile(join(this.getDir(), 'shiu-config.yaml'), 'utf8');
    }
  }

  async create(configFile?: string) {
    const config: ConfigFile = parse(await this.readConfigFile(configFile));

    const secretInjector = new SecretInjectorComposer();

    if (config.ssm) secretInjector.registerInjector(new AwsSSMSecretInjector(config.ssm));
    if (config.dotenv) secretInjector.registerInjector(new DotEnvSecretInjector(config.dotenv));

    return secretInjector;
  }
}
