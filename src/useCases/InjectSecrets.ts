import { SecretInjector } from '../services/SecretInjector';

export class InjectSecretsUseCase {
  constructor(private injector: SecretInjector) {}

  async execute() {
    await this.injector.inject();
  }
}
