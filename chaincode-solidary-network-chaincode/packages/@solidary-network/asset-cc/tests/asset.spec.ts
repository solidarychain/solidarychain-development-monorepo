// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Asset, AssetController } from '../src';

describe('Asset', () => {
  let adapter: MockControllerAdapter;
  let assetCtrl: ConvectorControllerClient<AssetController>;
  
  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    assetCtrl = ClientFactory(AssetController, adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'AssetController',
        name: join(__dirname, '..')
      }
    ]);

    adapter.addUser('Test');
  });
  
  it('should create a default model', async () => {
    const modelSample = new Asset({
      id: uuid(),
      name: 'Test',
      created: Date.now(),
      modified: Date.now()
    });

    await assetCtrl.$withUser('Test').create(modelSample);
  
    const justSavedModel = await adapter.getById<Asset>(modelSample.id);
  
    expect(justSavedModel.id).to.exist;
  });
});