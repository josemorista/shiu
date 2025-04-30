import { beforeEach, describe, it } from 'node:test';
import expect from 'node:assert/strict';
import { ProgramArgs } from '../../../src/entities/ProgramArgs';

describe('ProgramArgs', () => {
  beforeEach(() => {
    process.argv = [];
  });

  it('Should parse argv arguments at format -{1,2}arg=value', () => {
    process.argv = ['node', __filename, '--toys=woody', '-movie-number=1'];
    const sut = new ProgramArgs();
    expect.equal(sut.get(['toys']), 'woody');
    expect.equal(sut.get(['movie-number']), '1');
    expect.equal(sut.get(['cinema']), undefined);
  });

  it('Should throw error if arg is not found', () => {
    const sut = new ProgramArgs();
    try {
      sut.safeGet(['toys', 't']);
    } catch (error) {
      expect.equal(error instanceof Error, true);
      if (error instanceof Error) expect.equal(error.message, 'Missing required argument toys|t');
    }
  });
});
