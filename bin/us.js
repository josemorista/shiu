#! /usr/bin/env node

const { CreateInjector } = require('../dist/factories/CreateInjector');
const { InjectSecretsUseCase } = require('../dist/useCases/InjectSecrets');
const { PullSecretsUseCase } = require('../dist/useCases/PullSecrets');
const { InitUseCase } = require('../dist/useCases/Init');
const { ProgramArgs } = require('../dist/entities/ProgramArgs');

const cmd = process.argv[2];
const args = new ProgramArgs(3);

const injectorFactory = new CreateInjector();
const initUseCase = new InitUseCase();

const useCases = {
  inject: async () => {
    const injector = await injectorFactory.create();
    return new InjectSecretsUseCase(injector).execute(process.argv[3] || args.safeGet('path'));
  },
  pull: async () => {
    const injector = await injectorFactory.create();
    return new PullSecretsUseCase(injector).execute(args.get('env-path'));
  },
  init: () => {
    return initUseCase.execute({
      providers: args.safeGet('providers').split(','),
    });
  },
};

if (!(cmd in useCases)) throw new Error('Invalid script');

useCases[cmd]();
