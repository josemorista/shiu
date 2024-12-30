import { Secret } from '../entities/Secret';
import { SecretInjector } from './SecretInjector';

export class SecretInjectorComposer extends SecretInjector {
  private injectors: Array<SecretInjector> = [];

  registerInjector(injector: SecretInjector) {
    this.injectors.push(injector);
  }

  async pullSecrets(): Promise<Array<Secret>> {
    const secretsPulled = await Promise.all(this.injectors.map((injector) => injector.pullSecrets()));
    return secretsPulled.flat();
  }
}
