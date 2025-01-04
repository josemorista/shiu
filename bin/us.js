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
    const injector = await injectorFactory.create(args.get('config'));
    return new InjectSecretsUseCase(injector).execute(args.get('f') || args.safeGet('file'));
  },
  pull: async () => {
    const injector = await injectorFactory.create();
    return new PullSecretsUseCase(injector).execute(args.get('outfile'));
  },
  init: () => {
    return initUseCase.execute({
      providers: args.safeGet('providers').split(','),
      outfile: args.get('outfile'),
    });
  },
};

if (!(cmd in useCases)) throw new Error('Invalid script');

useCases[cmd]();
