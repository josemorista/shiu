import { afterEach, describe, it } from 'node:test';
import expect from 'node:assert/strict';
import { Secret } from '../../../src/entities/Secret';
import { FakeSecretInjector } from '../../fakes/FakeSecretInjector';
import { PullSecretsUseCase } from '../../../src/useCases/PullSecrets';
import { readFile, unlink } from 'node:fs/promises';

describe('PullSecretsUseCase', () => {
  describe('When pulling to dotenv', () => {
    afterEach(async () => {
      await unlink('_test.env');
    });

    it('Should load secrets into dotenv file', async () => {
      const fakeInjector = new FakeSecretInjector([new Secret('toys', 'Betty')]);
      const sut = new PullSecretsUseCase(fakeInjector);
      await sut.execute('_test.env');
      const dotEnv = await readFile('_test.env', 'utf8');
      expect.equal(dotEnv, `toys='Betty'`);
    });
  });
});
