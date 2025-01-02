import { CreateInjector } from './factories/CreateInjector';
import { InjectSecretsUseCase } from './useCases/InjectSecrets';

export { ConfigFile } from './entities/ConfigFile';

export const inject = async () => {
  const injectorFactory = new CreateInjector();
  const injector = await injectorFactory.create();
  return new InjectSecretsUseCase(injector).execute();
};
