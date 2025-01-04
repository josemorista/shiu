import { Config as SSMConfig } from '../services/AwsSSMSecretInjector';
import { Config as DotenvConfig } from '../services/DotEnvSecretInjector';

export interface ConfigFile {
  ssm?: SSMConfig;
  dotenv?: DotenvConfig;
}
