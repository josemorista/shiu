import { SecretInjector } from '../services/SecretInjector';
import { exec } from 'node:child_process';

export class InjectSecretsUseCase {
  constructor(private injector: SecretInjector) {}

  async execute(cmd?: string) {
    await this.injector.inject();
    if (cmd) {
      const cp = exec(cmd);
      cp.stdout?.pipe(process.stdout);
      cp.stderr?.pipe(process.stderr);
    }
  }
}
