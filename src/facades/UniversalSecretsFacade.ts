import { CreateInjector } from '../factories/CreateInjector';
import { InjectSecretsUseCase } from '../useCases/InjectSecrets';

export const inject = async () => {
  const injectorFactory = new CreateInjector();
  const injectorUseCase = new InjectSecretsUseCase(await injectorFactory.create());
  await injectorUseCase.execute();
};
