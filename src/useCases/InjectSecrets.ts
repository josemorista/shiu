import { SecretInjector } from '../services/SecretInjector';
import { execSync } from 'node:child_process';

export class InjectSecretsUseCase {
  constructor(private injector: SecretInjector) {}

  async execute(cmd?: Array<string>) {
    await this.injector.inject();
    if (cmd) {
      execSync(cmd.join(' '), {
        stdio: 'inherit',
      });
    }
  }
}
