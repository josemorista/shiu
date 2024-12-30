import { Component } from '../entities/Component';
import { Secret } from '../entities/Secret';

export abstract class SecretInjector extends Component {
  protected secrets: Array<Secret> = [];

  abstract pullSecrets(): Promise<Array<Secret>>;

  getSecrets() {
    return this.secrets.map((secret) => new Secret(secret.key, secret.value));
  }

  async inject() {
    await this.loadSecrets();
    this.secrets.forEach((secret) => {
      process.env[secret.key] = secret.value;
    });
  }

  async loadSecrets() {
    this.secrets = await this.pullSecrets();
  }
}
