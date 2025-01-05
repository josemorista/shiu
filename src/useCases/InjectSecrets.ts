import { SecretInjector } from '../services/SecretInjector';
import { spawn } from 'node:child_process';

export class InjectSecretsUseCase {
  constructor(private injector: SecretInjector) {}

  async execute(cmd?: Array<string>) {
    await this.injector.inject();
    if (cmd) {
      const [arg0, ...args] = cmd;
      const cp = spawn(arg0, args, {
        stdio: ['inherit', 'inherit', 'pipe'],
        detached: false,
        cwd: process.cwd(),
      });
      cp.stderr.pipe(process.stderr);
    }
  }
}
