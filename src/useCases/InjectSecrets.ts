import { SecretInjector } from '../services/SecretInjector';
import { exec } from 'node:child_process';

export class InjectSecretsUseCase {
  constructor(private injector: SecretInjector) {}

  async execute(cmd?: Array<string>) {
    await this.injector.inject();
    if (cmd) {
      const cp = exec(cmd.join(' '));
      if (cp.stdin) process.stdin.pipe(cp.stdin);
      if (cp.stdout) cp.stdout.pipe(process.stdout);
      if (cp.stderr) cp.stderr.pipe(process.stderr);
    }
  }
}
