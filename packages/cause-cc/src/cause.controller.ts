import { Controller, ConvectorController, Invokable, Param } from '@worldsibu/convector-core';
import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import * as yup from 'yup';
import { Cause } from './cause.model';
import { getEntity } from './utils';

@Controller('cause')
export class CauseController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async create(
    @Param(Cause)
    cause: Cause
  ) {
    // check duplicated id
    const exists = await Cause.getOne(cause.id);
    if (!!exists && exists.id) {
      throw new Error(`There is a cause with that Id already (${cause.id})`);
    }

    // create a new identity
    cause.identities = [{
      fingerprint: this.sender,
      status: true
    }];
    // assign input
    cause.input.entity = await getEntity(cause.input.type, cause.input.id);
    // clean non useful props, are required only top know sent entityType
    delete cause.input.id;
    delete cause.input.type;

    // add date in epoch unix time
    cause.created = new Date().getTime();

    await cause.save();
  }

  @Invokable()
  public async get(
    @Param(yup.string())
    id: string
  ) {
    const existing = await Cause.getOne(id);
    if (!existing || !existing.id) {
      throw new Error(`No cause exists with that ID ${id}`);
    }
    return existing;
  }

}