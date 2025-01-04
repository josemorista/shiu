import { after, before, describe, it } from 'node:test';
import expect from 'node:assert';
import { copyFile, unlink, writeFile } from 'node:fs/promises';
import { CreateInjector } from '../../../src/factories/CreateInjector';
import { SecretInjectorComposer } from '../../../src/services/SecretInjectorComposer';
import { AwsSSMSecretInjector } from '../../../src/services/AwsSSMSecretInjector';
import { DotEnvSecretInjector } from '../../../src/services/DotEnvSecretInjector';

describe('CreateInjector', () => {
  before(async () => {
    await writeFile(
      'us-config.js',
      `/**
      * @type {import('universal-secrets').ConfigFile}
      */
     module.exports = {
      ssm: { variables: [] },
      dotenv: { path: '.env' }
      };
      `
    );
  });

  after(async () => {
    await unlink('us-config.js');
  });

  it('Should create correct injector from default config file', async () => {
    const sut = new CreateInjector();
    const injector = await sut.create();
    expect.equal(injector instanceof SecretInjectorComposer, true);
    if (injector instanceof SecretInjectorComposer) {
      expect.equal(injector.getInjectors()[0] instanceof AwsSSMSecretInjector, true);
      expect.equal(injector.getInjectors()[1] instanceof DotEnvSecretInjector, true);
    }
  });

  it('Should create correct injector from custom config file', async () => {
    const sut = new CreateInjector();
    await copyFile('us-config.js', 'us-custom.js');
    const injector = await sut.create('us-custom.js');
    expect.equal(injector instanceof SecretInjectorComposer, true);
    if (injector instanceof SecretInjectorComposer) {
      expect.equal(injector.getInjectors()[0] instanceof AwsSSMSecretInjector, true);
      expect.equal(injector.getInjectors()[1] instanceof DotEnvSecretInjector, true);
    }
    await unlink('us-custom.js');
  });
});
