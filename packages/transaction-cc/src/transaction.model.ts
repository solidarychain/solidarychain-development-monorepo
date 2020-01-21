import { appConstants as c } from '@solidary-network/common';
import { ConvectorModel, ReadOnly, Required, Validate } from '@worldsibu/convector-core-model';
import * as yup from 'yup';
import { entitySchema, transactionTypeSchema, resourceTypeSchema, currencySchema } from './validation';
import { Entity, TransactionType, ResourceType } from './types';

export class Transaction extends ConvectorModel<Transaction> {
  @ReadOnly()
  @Required()
  public readonly type = c.CONVECTOR_MODEL_PATH_TRANSACTION;

  @ReadOnly()
  @Required()
  @Validate(transactionTypeSchema)
  public transactionType: TransactionType;

  @ReadOnly()
  @Required()
  @Validate(resourceTypeSchema)
  public resourceType: ResourceType;  

  @ReadOnly()
  @Required()
  @Validate(entitySchema)
  public input: Entity;

  @ReadOnly()
  @Required()
  @Validate(entitySchema)
  public output: Entity;

  @ReadOnly()
  @Required()
  @Validate(yup.number())
  public quantity: number;

  @ReadOnly()
  @Required()
  @Validate(currencySchema)
  public currency: string;

  @ReadOnly()
  @Validate(yup.string().matches(c.REGEX_LOCATION))
  public location: string;

  @Required()
  @Validate(yup.object().nullable())
  public metaData: any;

  @Validate(yup.object().nullable())
  public metaDataInternal: any;

  // @Required()
  // @Validate(Participant.schema())
  // public inputParticipant: FlatConvectorModel<Participant>;

  // @Required()
  // @Validate(Participant.schema())
  // public outputParticipant: FlatConvectorModel<Participant>;

  // @Required()
  // @Validate(Participant.schema())
  // public inputPerson: FlatConvectorModel<Person>;

  // @Required()
  // @Validate(Participant.schema())
  // public outputPerson: FlatConvectorModel<Person>;

  @ReadOnly()
  @Required()
  @Validate(yup.number())
  public created: number;
}
