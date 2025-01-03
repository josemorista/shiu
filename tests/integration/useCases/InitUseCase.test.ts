import { afterEach, describe, it } from 'node:test';
import expect from 'node:assert/strict';
import { InitUseCase } from '../../../src/useCases/Init';
import { readFile, unlink } from 'node:fs/promises';

describe('InitUseCase', () => {
  describe('When provider is ssm', () => {
    afterEach(async () => {
      await unlink('us-config.js');
    });

    it('Should load secrets', async () => {
      const sut = new InitUseCase();
      await sut.execute({
        providers: ['ssm'],
      });
      const content = await readFile('us-config.js', 'utf8');
      expect.equal(
        content,
        `/**
 * @type {import('universal-secrets').ConfigFile}
 */
module.exports = {
  ssm: { variables: [] }
};
`
      );
    });
  });
});
