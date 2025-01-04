import { before, it, describe, after } from 'node:test';
import expect from 'node:assert';
import { unlink, writeFile } from 'node:fs/promises';
import { Secret } from '../../../src/entities/Secret';
import { DotEnvSecretInjector } from '../../../src/services/DotEnvSecretInjector';

describe('DotEnvSecretInjector', () => {
  before(async () => {
    await writeFile(
      '.env',
      `
      TOYS='Woody,Betty,Buzz'
      VERSION=1
      `
    );
  });

  after(async () => {
    await unlink('.env');
  });

  it('Should pull secrets from .env file', async () => {
    const sut = new DotEnvSecretInjector({});
    const secrets = await sut.pullSecrets();
    expect.deepEqual(secrets, [new Secret('TOYS', 'Woody,Betty,Buzz'), new Secret('VERSION', '1')]);
  });
});
