import { describe, it } from 'node:test';
import expect from 'node:assert';
import { SecretInjectorComposer } from '../../../src/services/SecretInjectorComposer';
import { FakeSecretInjector } from '../../fakes/FakeSecretInjector';
import { Secret } from '../../../src/entities/Secret';

describe('SecretInjectorComposer', () => {
  it('Should merge all pulled secrets', async () => {
    const sut = new SecretInjectorComposer();
    const secrets = [new Secret('toys', 'Betty'), new Secret('movie-number', '2')];
    sut.registerInjector(new FakeSecretInjector([secrets[0]]));
    sut.registerInjector(new FakeSecretInjector([secrets[1]]));
    expect.deepEqual(await sut.pullSecrets(), secrets);
  });
});
