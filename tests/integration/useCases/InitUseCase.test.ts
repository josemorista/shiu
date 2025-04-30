import { afterEach, describe, it } from 'node:test';
import expect from 'node:assert/strict';
import { InitUseCase } from '../../../src/useCases/Init';
import { readFile, unlink } from 'node:fs/promises';
import { stringify } from 'yaml';

const dummyOutfile = 'init-conf.yml';
describe('InitUseCase', () => {
  describe('When provider is ssm and dotenv', () => {
    afterEach(async () => {
      await unlink(dummyOutfile);
    });

    it('Should create config file with providers', async () => {
      const sut = new InitUseCase();
      await sut.execute({
        providers: ['ssm', 'dotenv'],
        outfile: dummyOutfile,
      });
      const content = await readFile(dummyOutfile, 'utf8');
      expect.equal(content, stringify({ ssm: { variables: [] }, dotenv: { path: '.env' } }));
    });
  });
});
