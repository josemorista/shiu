import { CreateInjector } from '../factories/CreateInjector';
import { InjectSecretsUseCase } from '../useCases/InjectSecrets';

export const inject = async (configFile?: string) => {
  const injectorFactory = new CreateInjector();
  const injectorUseCase = new InjectSecretsUseCase(await injectorFactory.create(configFile));
  await injectorUseCase.execute();
};
