import { appConstants as c, entitySchema } from '@solidary-network/common';
import { ConvectorModel, ReadOnly, Required, Validate } from '@worldsibu/convector-core-model';
import * as yup from 'yup';
import { transactionTypeSchema, resourceTypeSchema, currencySchema } from './validation';
import { Entity, TransactionType, ResourceType } from './types';

export class Transaction extends ConvectorModel<Transaction> {
  @ReadOnly()
  @Required()
  public readonly type = c.CONVECTOR_MODEL_PATH_TRANSACTION;

  // FUCK we can't use // @ReadOnly() else yup validations won't work!!!!!!! remove all @ReadOnly() from everywhere

  @Required()
  @Validate(transactionTypeSchema)
  public transactionType: TransactionType;

  @Required()
  @Validate(resourceTypeSchema)
  public resourceType: ResourceType;

  @Required()
  @Validate(entitySchema)
  public input: Entity;

  @Required()
  @Validate(entitySchema)
  public output: Entity;

  @Required()
  @Validate(yup.number())
  public quantity: number;

  @Validate(currencySchema)
  public currency: string;

  @Validate(yup.string().matches(c.REGEX_LOCATION))
  public location: string;

  @Validate(yup.object().nullable())
  public metaData: any;

  @Validate(yup.object().nullable())
  public metaDataInternal: any;

  @Required()
  @Validate(yup.number())
  public created: number;

  // @Required()
  // @Validate(Participant.schema())
  // public input: FlatConvectorModel<Participant>;

  // @Required()
  // @Validate(Participant.schema())
  // public output: FlatConvectorModel<Participant>;
}
