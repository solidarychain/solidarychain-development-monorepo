import { appConstants as c, entitySchema, x509Identities } from '@solidary-network/common-cc';
import { ConvectorModel, ReadOnly, Required, Validate, FlatConvectorModel } from '@worldsibu/convector-core-model';
import * as yup from 'yup';
import { transactionTypeSchema, resourceTypeSchema, currencySchema } from './validation';
import { Entity } from '.';
import { TransactionType, ResourceType } from './enums';
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
  @Validate(yup.string())
  public assetId: string;

  @Required()
  @Validate(yup.number())
  public quantity: number;

  @Required()
  @Validate(currencySchema)
  public currency: string;

  @Validate(yup.string().matches(c.REGEX_LOCATION))
  public location: string;

  // TODO: tags
  @Validate(yup.array().of(yup.string()))
  public tags: Array<String>;
  
  @Validate(yup.object().nullable())
  public metaData: any;

  @Validate(yup.object().nullable())
  public metaDataInternal: any;

  @Required()
  @Validate(yup.number())
  public createdDate: number;

  // DON'T add @Required
  @Validate(Participant.schema())
  public participant: FlatConvectorModel<Participant>;
    
  // DON'T add @Required
  @Validate(yup.array(x509Identities.schema()))
  public identities: Array<FlatConvectorModel<x509Identities>>;

}
