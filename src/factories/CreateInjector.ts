import { join } from 'path';
import { ConfigFile } from '../entities/ConfigFile';
import { SecretInjectorComposer } from '../services/SecretInjectorComposer';
import { AwsSSMSecretInjector } from '../services/AwsSSMSecretInjector';
import { DotEnvSecretInjector } from '../services/DotEnvSecretInjector';

export class CreateInjector {
  private getDir() {
    return process.env.PWD || '.';
  }

  private async importConfigFile(configFile?: string) {
    if (configFile) return import(join(this.getDir(), configFile));

    try {
      return await import(join(this.getDir(), 'us-config.mjs'));
    } catch {
      return await import(join(this.getDir(), 'us-config.js'));
    }
  }

  async create(configFile?: string) {
    const config: ConfigFile = (await this.importConfigFile(configFile)).default;

    const secretInjector = new SecretInjectorComposer();
    if (config.ssm) secretInjector.registerInjector(new AwsSSMSecretInjector(config.ssm));
    if (config.dotenv) secretInjector.registerInjector(new DotEnvSecretInjector(config.dotenv));

    return secretInjector;
  }
}
