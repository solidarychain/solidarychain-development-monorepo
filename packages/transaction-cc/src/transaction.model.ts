import { appConstants as c, entitySchema, x509Identities } from '@solidary-network/common';
import { ConvectorModel, ReadOnly, Required, Validate, FlatConvectorModel } from '@worldsibu/convector-core-model';
import * as yup from 'yup';
import { transactionTypeSchema, resourceTypeSchema, currencySchema } from './validation';
import { Entity } from './types';
import { TransactionType, ResourceType } from '.';
import { Participant } from '@solidary-network/participant-cc';

export class Transaction extends ConvectorModel<Transaction> {
  @ReadOnly()
  @Required()
  public readonly type = c.CONVECTOR_MODEL_PATH_TRANSACTION;

  // FUCK we can't use @ReadOnly() else yup validations won't work!!!!!!! remove all @ReadOnly() from everywhere

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

  // TODO: added
  @Required()
  @Validate(Participant.schema())
  public participant: FlatConvectorModel<Participant>;
    
  // TODO: added
  @Required()
  @Validate(yup.array(x509Identities.schema()))
  public identities: Array<FlatConvectorModel<x509Identities>>;

}
