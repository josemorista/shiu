import { SecretInjector } from '../services/SecretInjector';
import { DotEnvSecretsExportVisitor } from '../visitors/DotEnvSecretsExportVisitor';

export class PullSecretsUseCase {
  constructor(private injector: SecretInjector) {}

  async execute() {
    await this.injector.loadSecrets();
    await this.injector.accept(new DotEnvSecretsExportVisitor(process.argv[2]));
  }
}
