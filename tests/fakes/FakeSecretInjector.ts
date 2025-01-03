import { Secret } from '../../src/entities/Secret';
import { SecretInjector } from '../../src/services/SecretInjector';

export class FakeSecretInjector extends SecretInjector {
  constructor(private _secrets: Array<Secret>) {
    super();
  }

  async pullSecrets(): Promise<Array<Secret>> {
    return this._secrets;
  }
}
