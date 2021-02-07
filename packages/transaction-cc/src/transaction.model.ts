import { appConstants as c, entitySchema, x509Identities, Goods, GoodsInput, CurrentUser, getInputAndOutputAmbassadorUserFilter } from '@solidary-chain/common-cc';
import { Participant } from '@solidary-chain/participant-cc';
import { ConvectorModel, FlatConvectorModel, ReadOnly, Required, Validate } from '@worldsibu/convector-core-model';
import * as yup from 'yup';
import { ResourceType, TransactionType } from './enums';
import { Entity } from './types';
import { currencySchema, resourceTypeSchema, transactionTypeSchema } from './validation';

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

  @Validate(yup.number().nullable())
  public quantity: number;

  @Validate(currencySchema)
  public currency: string;

  @Validate(yup.string().matches(c.REGEX_LOCATION, { excludeEmptyString: true }))
  public location: string;

  @Validate(yup.array().of(yup.string()))
  public tags: string[];

  @Validate(yup.object().nullable())
  public metaData: any;

  @Validate(yup.object().nullable())
  public metaDataInternal: any;

  @Required()
  @Validate(yup.number())
  public createdDate: number;

  @Validate(yup.string())
  public createdByPersonId?: string;

  // DON'T add @Required
  @Validate(Participant.schema())
  public participant: FlatConvectorModel<Participant>;

  // DON'T add @Required
  @Validate(yup.array(x509Identities.schema()))
  public identities: Array<FlatConvectorModel<x509Identities>>;

  // optional, only when we transfer assets we require it

  @Validate(yup.string())
  public assetId: string;

  // search 2354 : do we need this for what: optional, only when we transfer goods we require it

  @Validate(yup.array(Goods.schema()).nullable())
  public goods?: Array<FlatConvectorModel<Goods>>;

  // send by graphql api
  @Validate(yup.array().of(yup.object()))
  public goodsInput?: Array<GoodsInput>;

  // above implementation is equal in all models, only change the type and CONVECTOR_MODEL_PATH_${MODEL}

  // custom static implementation getById
  public static async getById(id: string, user: CurrentUser): Promise<Transaction> {
    const resultSet: Transaction | Transaction[] = await this.getByFilter({ filter: { _id: id } }, user);
    if (!resultSet || !resultSet[0] || !resultSet[0].id) {
      throw new Error(`No ${Transaction.name.toLowerCase()} exists with that id ${id}`);
    }
    // return only one record in findById
    return resultSet[0];
  }

  // custom static implementation getByField
  public static async getByField(fieldName: string, fieldValue: string, user: CurrentUser): Promise<Transaction | Transaction[]> {
    const resultSet: Transaction | Transaction[] = await this.getByFilter({ filter: { [fieldName]: fieldValue } }, user);
    if (!resultSet || !resultSet[0] || !resultSet[0].id) {
      throw new Error(`No ${Transaction.name.toLowerCase()} exists with that fieldName: ${fieldName} and fieldValue ${fieldValue}`);
    }
    // return recordSet
    return resultSet;
  }

  // custom static implementation getByFilter
  public static async getByFilter(queryParams: { filter?: any, sort?: any }, user: CurrentUser): Promise<Transaction | Transaction[]> {
    const userFilter = getInputAndOutputAmbassadorUserFilter(user);
    const complexQuery: any = {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_TRANSACTION,
        // add userFilter
        ...userFilter,
        // spread arbitrary query filter
        ...queryParams.filter,
      },
      // fields: (queryParams.fields) ? queryParams.fields : undefined,
      sort: (queryParams.sort) ? queryParams.sort : undefined,
    };
    const resultSet: Transaction | Transaction[] = await Transaction.query(Transaction, complexQuery);
    // return recordSet
    return resultSet;
  }
}
