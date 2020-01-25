// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Transaction, TransactionController } from '../src';

describe('Transaction', () => {
  let adapter: MockControllerAdapter;
  let transactionCtrl: ConvectorControllerClient<TransactionController>;
  
  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    transactionCtrl = ClientFactory(TransactionController, adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'TransactionController',
        name: join(__dirname, '..')
      }
    ]);
  });
  
  it('should create a default model', async () => {
    // TODO Fix Me
    const modelSample = new Transaction({
      id: uuid(),
      name: 'Test',
      created: Date.now(),
      modified: Date.now()
    });

    await transactionCtrl.create(modelSample);
  
    const justSavedModel = await adapter.getById<Transaction>(modelSample.id);
  
    expect(justSavedModel.id).to.exist;
  });
});