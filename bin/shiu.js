#! /usr/bin/env node

const { CreateInjector } = require('../dist/factories/CreateInjector');
const { InjectSecretsUseCase } = require('../dist/useCases/InjectSecrets');
const { PullSecretsUseCase } = require('../dist/useCases/PullSecrets');
const { InitUseCase } = require('../dist/useCases/Init');
const { ProgramArgs } = require('../dist/entities/ProgramArgs');

const cmd = process.argv[2];
const args = new ProgramArgs();

const injectorFactory = new CreateInjector();
const initUseCase = new InitUseCase();

const useCases = {
  exec: async () => {
    const injector = await injectorFactory.create(args.get(['f', 'config']));
    const cmdSplitterIndex = process.argv.findIndex((arg) => arg === '--') + 1;
    return new InjectSecretsUseCase(injector).execute(process.argv.slice(cmdSplitterIndex, process.argv.length));
  },
  pull: async () => {
    const injector = await injectorFactory.create();
    return new PullSecretsUseCase(injector).execute(args.get(['o', 'output']));
  },
  init: () => {
    return initUseCase.execute({
      providers: args.safeGet(['p', 'providers']).split(','),
      outfile: args.get(['f', 'config']),
    });
  },
};

if (!(cmd in useCases)) throw new Error('Invalid script');

useCases[cmd]();
