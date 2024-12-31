import { writeFile } from 'fs/promises';

interface Input {
  providers: Array<string>;
}

export class InitUseCase {
  async execute(input: Input) {
    const providersConfig: Array<string> = [];
    if (input.providers.includes('ssm')) {
      providersConfig.push('ssm: { variables: [] }');
    }

    await writeFile(
      'us-config.js',
      `/**
 * @type {import('universal-secrets').ConfigFile}
 */
module.exports = {
  ${providersConfig.join(',\n')}
};
`
    );
  }
}
