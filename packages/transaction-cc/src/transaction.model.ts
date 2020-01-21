import { appConstants as c } from '@solidary-network/common';
import { ConvectorModel, ReadOnly, Required, Validate, FlatConvectorModel } from '@worldsibu/convector-core-model';
import * as yup from 'yup';
import { entitySchema } from './validation';
import { Entity } from './types';
import { Participant } from '@solidary-network/participant-cc';
import { Person } from '@solidary-network/person-cc';

export class Transaction extends ConvectorModel<Transaction> {
  @ReadOnly()
  @Required()
  public readonly type = c.CONVECTOR_MODEL_PATH_TRANSACTION;

  // TODO: remove
  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public name: string;

  @ReadOnly()
  @Required()
  @Validate(entitySchema)
  public input: Entity;

  @ReadOnly()
  @Required()
  @Validate(entitySchema)
  public output: Entity;

  // @Required()
  @Validate(Participant.schema())
  public inputParticipant: FlatConvectorModel<Participant>;

  // @Required()
  @Validate(Participant.schema())
  public outputParticipant: FlatConvectorModel<Participant>;

  // @Required()
  @Validate(Participant.schema())
  public inputPerson: FlatConvectorModel<Person>;

  // @Required()
  @Validate(Participant.schema())
  public outputPerson: FlatConvectorModel<Person>;

  @ReadOnly()
  @Required()
  @Validate(yup.number())
  public created: number;
}
