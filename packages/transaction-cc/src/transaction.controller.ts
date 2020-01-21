import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import * as yup from 'yup';
import { Controller, ConvectorController, Invokable, Param } from '@worldsibu/convector-core';
import { Transaction } from './transaction.model';
import { Participant } from '@solidary-network/participant-cc';
import { Person } from '@solidary-network/person-cc/dist/src/person.model';
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
      throw new Error(`There is a person transaction with that Id already (${transaction.id})`);
    }

    // add date in epoch unix time
    transaction.created = new Date().getTime();

    const participantId = 'gov';
    const participant = await Participant.getOne(participantId);
    if (!participant || !participant.identities) {
      throw new Error(`No participant found with id ${participantId}`);
    }

    const personId = '4ea88521-031b-4279-9165-9c10e1838009';
    const person = await Person.getOne(personId);
    if (!participant || !participant.identities) {
      throw new Error(`No person found with id ${personId}`);
    }

    transaction.inputParticipant = participant;
    transaction.outputPerson = person;

    // test to try to use one input and one output property for all the different types
    transaction.input.output = participant;
    transaction.output.output = person;

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