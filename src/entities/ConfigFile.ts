import { Config as SSMConfig } from '../services/AwsSSMSecretInjector';

export interface ConfigFile {
  ssm?: SSMConfig;
}
