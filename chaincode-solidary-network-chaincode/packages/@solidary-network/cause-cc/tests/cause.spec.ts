// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Cause, CauseController } from '../src';

describe('Cause', () => {
  let adapter: MockControllerAdapter;
  let causeCtrl: ConvectorControllerClient<CauseController>;

  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    causeCtrl = ClientFactory(CauseController, adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'CauseController',
        name: join(__dirname, '..')
      }
    ]);
  });

  it('should create a default model', async () => {
    // TODO Fix Me
    const id = uuid();
    await causeCtrl.create(id, 'Test Cause');

    const justSavedModel = await adapter.getById<Cause>(id);

    expect(justSavedModel.id).to.exist;
  });
});