#! /usr/bin/env node

const { DotEnvSecretsExportVisitor } = require('../dist/visitors/DotEnvSecretsExportVisitor');
const { CreateInjector } = require('../dist/factories/CreateInjector');

const injectorFactory = new CreateInjector();

injectorFactory.create().then((secretInjector) => {
  secretInjector.loadSecrets().then(() => {
    secretInjector.accept(new DotEnvSecretsExportVisitor(process.argv[2]));
  });
});
