import { Controller, ConvectorController, Invokable, Param } from '@worldsibu/convector-core';
import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import * as yup from 'yup';
import { Transaction } from './transaction.model';
// import { Participant } from '@solidary-network/participant-cc';
// import { Person } from '@solidary-network/person-cc/dist/src/person.model';
// import { EntityType } from './types';
import { getEntity } from './utils';
// import {EntityType} from './types';

@Controller('transaction')
export class TransactionController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async create(
    @Param(Transaction)
    transaction: Transaction
  ) {
    // check duplicated id
    const exists = await Transaction.getOne(transaction.id);
    if (!!exists && exists.id) {
      throw new Error(`There is a transaction with that Id already (${transaction.id})`);
    }

    // add date in epoch unix time
    transaction.created = new Date().getTime();

    // assign input/output
    transaction.input.entity = await getEntity(transaction.input.type, transaction.input.id);
    transaction.output.entity = await getEntity(transaction.output.type, transaction.output.id);
    // clean non useful props, are required only top know sent entityType
    delete transaction.input.id;
    delete transaction.output.id;
    delete transaction.input.type;
    delete transaction.output.type;

    await transaction.save();
  }

  @Invokable()
  public async get(
    @Param(yup.string())
    id: string
  ) {
    const existing = await Transaction.getOne(id);
    if (!existing || !existing.id) {
      throw new Error(`No transaction exists with that ID ${id}`);
    }
    return existing;
  }

}