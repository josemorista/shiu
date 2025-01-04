import { after, before, describe, it } from 'node:test';
import expect from 'node:assert';
import { unlink, writeFile } from 'node:fs/promises';
import { CreateInjector } from '../../../src/factories/CreateInjector';
import { SecretInjectorComposer } from '../../../src/services/SecretInjectorComposer';
import { AwsSSMSecretInjector } from '../../../src/services/AwsSSMSecretInjector';

describe('CreateInjector', () => {
  describe('When config has ssm entry', () => {
    before(async () => {
      await writeFile(
        'us-config.js',
        `/**
      * @type {import('universal-secrets').ConfigFile}
      */
     module.exports = {
      ssm: { variables: [] }
      };
      `
      );
    });

    after(async () => {
      await unlink('us-config.js');
    });

    it('Should create correct injector from config file', async () => {
      const sut = new CreateInjector();
      const injector = await sut.create();
      expect.equal(injector instanceof SecretInjectorComposer, true);
      if (injector instanceof SecretInjectorComposer) {
        expect.equal(injector.getInjectors()[0] instanceof AwsSSMSecretInjector, true);
      }
    });
  });
});
