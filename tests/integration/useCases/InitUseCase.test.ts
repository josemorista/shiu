import { afterEach, describe, it } from 'node:test';
import expect from 'node:assert/strict';
import { InitUseCase } from '../../../src/useCases/Init';
import { readFile, unlink } from 'node:fs/promises';

describe('InitUseCase', () => {
  describe('When provider is ssm', () => {
    afterEach(async () => {
      await unlink('us-init-config.js');
    });

    it('Should create config file with providers', async () => {
      const sut = new InitUseCase();
      await sut.execute({
        providers: ['ssm', 'dotenv'],
        outfile: 'us-init-config.js',
      });
      const content = await readFile('us-init-config.js', 'utf8');
      expect.equal(
        content,
        `/**
 * @type {import('psiu').ConfigFile}
 */
module.exports = {
  ssm: { variables: [] },
  dotenv: { path: '.env' },
};
`
      );
    });
  });
});
