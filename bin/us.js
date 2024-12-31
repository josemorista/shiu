#! /usr/bin/env node

const { CreateInjector } = require('../dist/factories/CreateInjector');
const { InjectSecretsUseCase } = require('../dist/useCases/InjectSecrets');
const { PullSecretsUseCase } = require('../dist/useCases/PullSecrets');
const { InitUseCase } = require('../dist/useCases/Init');

const cmd = process.argv[2] || 'inject';

if (cmd === 'init') {
  const initUseCase = new InitUseCase();
  initUseCase.execute({
    providers: (process.argv[3] || '').split(','),
  });
} else {
  const injectorFactory = new CreateInjector();

  injectorFactory.create().then((injector) => {
    const useCases = {
      inject: new InjectSecretsUseCase(injector),
      pull: new PullSecretsUseCase(injector),
    };

    if (!(cmd in useCases)) throw new Error('Invalid script');

    useCases[cmd].execute();
  });
}
