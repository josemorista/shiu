import { SecretInjector } from '../services/SecretInjector';
import { DotEnvSecretsExportVisitor } from '../visitors/DotEnvSecretsExportVisitor';

export class PullSecretsUseCase {
  constructor(private injector: SecretInjector) {}

  async execute(path?: string) {
    await this.injector.loadSecrets();
    await this.injector.accept(new DotEnvSecretsExportVisitor(path));
  }
}
