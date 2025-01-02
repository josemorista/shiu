import { resolve } from 'node:path';
import { SecretInjector } from '../services/SecretInjector';

export class InjectSecretsUseCase {
  constructor(private injector: SecretInjector) {}

  async execute(file?: string) {
    await this.injector.inject();
    if (file) await import(resolve(file));
  }
}
