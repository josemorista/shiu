import { describe, it } from 'node:test';
import expect from 'node:assert/strict';
import { Secret } from '../../../src/entities/Secret';
import { FakeSecretInjector } from '../../fakes/FakeSecretInjector';

describe('SecretInjector', () => {
  it('Should load secrets into process.env', async () => {
    const sut = new FakeSecretInjector([new Secret('toys', 'Betty')]);
    await sut.inject();
    expect.equal(process.env.toys, 'Betty');
  });
});
