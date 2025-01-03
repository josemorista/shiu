import { describe, it } from 'node:test';
import expect from 'node:assert/strict';
import { Secret } from '../../../src/entities/Secret';
import { FakeSecretInjector } from '../../fakes/FakeSecretInjector';
import { InjectSecretsUseCase } from '../../../src/useCases/InjectSecrets';

describe('InjectSecretsUseCase', () => {
  it('Should load secrets', async () => {
    const fakeInjector = new FakeSecretInjector([new Secret('toys', 'Betty')]);
    const sut = new InjectSecretsUseCase(fakeInjector);
    await sut.execute();
    expect.equal(process.env.toys, 'Betty');
  });
});
