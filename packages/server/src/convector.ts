import { Logger } from '@nestjs/common';
import { FabricControllerAdapter } from '@worldsibu/convector-adapter-fabric';
import { ClientFactory } from '@worldsibu/convector-core';
import * as fs from 'fs';
import { ParticipantController, Participant } from 'participant-cc';
import { PersonController } from 'person-cc';
import { join, resolve } from 'path';

import { keyStore, identityName, channel, chaincode, networkProfile, identityId } from './env';

const adapter = new FabricControllerAdapter({
  txTimeout: 300000,
  user: identityName,
  channel,
  chaincode,
  keyStore: resolve(__dirname, keyStore),
  networkProfile: resolve(__dirname, networkProfile),
});

export const initAdapter = adapter.init();
export const ParticipantControllerBackEnd = ClientFactory(ParticipantController, adapter);
export const PersonControllerBackEnd = ClientFactory(PersonController, adapter);

/**
 * Check if the identity has been initialized in the chaincode.
 */
export async function InitServerIdentity() {
  await initAdapter;
  const res = await ParticipantControllerBackEnd.get(identityId);
  try {
    const serverIdentity = new Participant(res).toJSON();

    if (!serverIdentity || !serverIdentity.id) {
      throw new Error('Server identity does not exists, make sure to enroll it or seed data');
    } else {
      Logger.log('Server identity exists');
    }
  } catch (ex) {
    Logger.log(JSON.stringify(ex));
    throw new Error('Server identity does not exists, make sure to enroll it or seed data');
  }
}

const contextPath = join(keyStore + '/' + identityName);
fs.readFile(contextPath, 'utf8', async (err, data) => {
  if (err) {
    throw new Error(`Context in ${contextPath} doesn't exist. Make sure that path resolves to your key stores folder`);
  } else {
    Logger.log('Context path with cryptographic materials exists');
  }
});
