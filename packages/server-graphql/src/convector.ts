import { Logger } from '@nestjs/common';
import { AssetController } from '@solidary-chain/asset-cc';
import { CauseController } from '@solidary-chain/cause-cc';
import { Participant, ParticipantController } from '@solidary-chain/participant-cc';
import { PersonController } from '@solidary-chain/person-cc';
import { TransactionController } from '@solidary-chain/transaction-cc';
import { FabricControllerAdapter } from '@worldsibu/convector-adapter-fabric';
import { ClientFactory } from '@worldsibu/convector-core';
import * as fs from 'fs';
import { join, resolve } from 'path';
import { appConstants as c} from './constants';
import { envVariables as e } from './env';

/**
 * shared common file in both packages, duplicated to
 * be customized for each api/organization/participant
 * packages/server-graphql/src/convector.ts
 * packages/server-rest/src/convector.ts
 */

const adapter = new FabricControllerAdapter({
  txTimeout: 300000,
  user: e.identityName,
  channel: e.channel,
  chaincode: e.chaincode,
  keyStore: resolve(__dirname, e.keyStore),
  networkProfile: resolve(__dirname, e.networkProfile),
});

// init adapter
export const initAdapter = adapter.init();
// init controllers
export const ParticipantControllerBackEnd = ClientFactory(ParticipantController, adapter);
export const PersonControllerBackEnd = ClientFactory(PersonController, adapter);
export const CauseControllerBackEnd = ClientFactory(CauseController, adapter);
export const AssetControllerBackEnd = ClientFactory(AssetController, adapter);
export const TransactionControllerBackEnd = ClientFactory(TransactionController, adapter);

/**
 * Check if the identity has been initialized in the chaincode.
 */
export async function InitServerIdentity() {
  await initAdapter;
  const res = await ParticipantControllerBackEnd.get(e.identityId, c.CURRENT_USER_ADMIN_ROLE);
  try {
    // convert fabric model to convector model (remove _props)
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

const contextPath = join(e.keyStore + '/' + e.identityName);
fs.readFile(contextPath, 'utf8', async (err, data) => {
  if (err) {
    throw new Error(`Context in ${contextPath} doesn't exist. Make sure that path resolves to your key stores folder`);
  } else {
    Logger.log('Context path with cryptographic materials exists');
  }
});
