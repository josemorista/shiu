#! /usr/bin/env node

const { CreateInjector } = require('../dist/factories/CreateInjector');

const injectorFactory = new CreateInjector();

injectorFactory.create().then((secretInjector) => {
  secretInjector.inject();
});
