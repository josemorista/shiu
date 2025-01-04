import { join } from 'path';
import { ConfigFile } from '../entities/ConfigFile';
import { SecretInjectorComposer } from '../services/SecretInjectorComposer';
import { AwsSSMSecretInjector } from '../services/AwsSSMSecretInjector';

export class CreateInjector {
  private getPath() {
    return process.env.US_CONFIG_PATH || process.env.PWD || '.';
  }

  private async importConfigFile() {
    try {
      return await import(join(this.getPath(), 'us-config.mjs'));
    } catch {
      return await import(join(this.getPath(), 'us-config.js'));
    }
  }

  async create() {
    const config: ConfigFile = (await this.importConfigFile()).default;

    const secretInjector = new SecretInjectorComposer();
    if (config.ssm) secretInjector.registerInjector(new AwsSSMSecretInjector(config.ssm));

    return secretInjector;
  }
}
