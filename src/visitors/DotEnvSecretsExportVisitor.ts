import { Visitor } from '../entities/Visitor';
import { SecretInjector } from '../services/SecretInjector';
import { writeFile } from 'fs/promises';

export class DotEnvSecretsExportVisitor implements Visitor {
  constructor(public path: string = '.env') {}

  async visit(secretInjector: SecretInjector): Promise<void> {
    const secrets = secretInjector.getSecrets();
    const secretsDotEnv = secrets.map((secret) => `${secret.key}='${secret.value}'`).join('\n');
    await writeFile(this.path, secretsDotEnv);
  }
}
