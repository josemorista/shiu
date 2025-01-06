import { before, it, describe, after } from 'node:test';
import expect from 'node:assert';

import { LocalstackContainer, StartedLocalStackContainer } from '@testcontainers/localstack';
import { AwsSSMSecretInjector } from '../../../src/services/AwsSSMSecretInjector';
import { PutParameterCommand, SSMClient } from '@aws-sdk/client-ssm';
import { Secret } from '../../../src/entities/Secret';

describe('AwsSSMSecretInjector', () => {
  let localStackContainer: StartedLocalStackContainer;
  let awsConfig: { endpoint: string; region: string };
  let ssmClient: SSMClient;
  const dummySecrets = [new Secret('toys', 'Rex'), new Secret('toysSecret', 'hi!')];

  before(async () => {
    localStackContainer = await new LocalstackContainer('localstack/localstack').start();
    awsConfig = {
      endpoint: localStackContainer.getConnectionUri(),
      region: 'us-east-1',
    };
    ssmClient = new SSMClient(awsConfig);
  });

  after(async () => {
    await localStackContainer.stop({
      remove: true,
    });
  });

  it('Should pull secret from ssm', async () => {
    await ssmClient.send(
      new PutParameterCommand({
        Name: dummySecrets[0].key,
        Value: dummySecrets[0].value,
        Type: 'String',
      })
    );
    const sut = new AwsSSMSecretInjector({
      clientConfig: awsConfig,
      variables: [
        {
          name: dummySecrets[0].key,
          path: dummySecrets[0].key,
        },
      ],
    });
    expect.deepEqual(await sut.pullSecrets(), [dummySecrets[0]]);
  });

  it('Should throw error if secret does not exists on ssm', async () => {
    const sut = new AwsSSMSecretInjector({
      clientConfig: awsConfig,
      variables: [
        {
          name: 'someRandomSecret',
          path: 'someRandomSecretPath',
        },
      ],
    });
    try {
      await sut.pullSecrets();
    } catch (error) {
      if (error instanceof Error) {
        expect.equal(error.message, 'Missing ssm variable someRandomSecret');
      }
    }
  });

  it('Should pull secure secret from ssm', async () => {
    await ssmClient.send(
      new PutParameterCommand({
        Name: dummySecrets[1].key,
        Value: dummySecrets[1].value,
        Type: 'SecureString',
      })
    );
    const sut = new AwsSSMSecretInjector({
      clientConfig: awsConfig,
      variables: [
        {
          name: dummySecrets[1].key,
          path: dummySecrets[1].key,
          secret: true,
        },
      ],
    });
    expect.deepEqual(await sut.pullSecrets(), [dummySecrets[1]]);
  });
});
