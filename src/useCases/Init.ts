import { writeFile } from 'fs/promises';
import { stringify } from 'yaml';

interface Input {
  providers: Array<string>;
  outfile?: string;
}

export class InitUseCase {
  async execute(input: Input) {
    const providersConfig: Record<string, unknown> = {};

    if (input.providers.includes('ssm')) {
      providersConfig.ssm = { variables: [] };
    }
    if (input.providers.includes('dotenv')) {
      providersConfig.dotenv = { path: '.env' };
    }

    await writeFile(input.outfile || 'shiu-config.yml', stringify(providersConfig));
  }
}
