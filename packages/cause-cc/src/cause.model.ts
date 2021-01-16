import { appConstants as c, CurrentUser, entitySchema, GenericBalance, getAmbassadorUserFilter, Goods } from '@solidary-chain/common-cc';
import { ConvectorModel, FlatConvectorModel, ReadOnly, Required, Validate } from '@worldsibu/convector-core';
import * as yup from 'yup';
import { x509Identities } from '@solidary-chain/common-cc';
import { Entity } from './types';
import { Participant } from '@solidary-chain/participant-cc';

export class Cause extends ConvectorModel<Cause> {
  @ReadOnly()
  @Required()
  public readonly type = c.CONVECTOR_MODEL_PATH_CAUSE;

  @Required()
  @Validate(yup.string())
  public name: string;

  @Validate(yup.string().matches(c.REGEX_EMAIL, c.YUP_MESSAGE_INVALID_EMAIL))
  public email: string;

  @Validate(yup.array().of(yup.string()))
  public ambassadors: string[];

  @Validate(yup.number())
  public startDate: number;

  @Validate(yup.number())
  public endDate: number;

  @Validate(yup.string().matches(c.REGEX_LOCATION, { excludeEmptyString: true }))
  public location: string;

  @Validate(yup.array().of(yup.string()))
  public tags: string[];

  @Required()
  @Validate(entitySchema)
  public input: Entity;

  @Required()
  @Validate(Participant.schema())
  public participant: FlatConvectorModel<Participant>;

  @Required()
  @Validate(yup.array(x509Identities.schema()))
  public identities: Array<FlatConvectorModel<x509Identities>>;

  @Validate(yup.object().nullable())
  public metaData: any;

  @Validate(yup.object().nullable())
  public metaDataInternal: any;

  @Required()
  @Validate(yup.number())
  public createdDate: number;

  // persisted with loggedPersonId
  @Validate(yup.string())
  public createdByPersonId?: string;

  @Required()
  @Validate(GenericBalance.schema())
  public fundsBalance: GenericBalance;
  
  @Required()
  @Validate(GenericBalance.schema())
  public volunteeringHoursBalance: GenericBalance;

  @Required()
  @Validate(yup.array(Goods.schema()))
  public goodsStock: Array<FlatConvectorModel<Goods>>;

  // above implementation is equal in all models, only change the type and CONVECTOR_MODEL_PATH_${MODEL}

  // custom static implementation getById
  public static async getById(id: string, user: CurrentUser): Promise<Cause> {
    const result: Cause | Cause[] = await this.getByFilter({ filter: { _id: id } }, user);
    if (!result || !result[0] || !result[0].id) {
      throw new Error(`No ${Cause.name.toLowerCase()} exists with that id ${id}`);
    }
    return result[0];
  }

  // custom static implementation getByField
  public static async getByField(fieldName: string, fieldValue: string, user: CurrentUser): Promise<Cause | Cause[]> {
    const result: Cause | Cause[] =  await this.getByFilter({ filter: { [fieldName]: fieldValue } }, user);
    if (!result || !result[0] || !result[0].id) {
      throw new Error(`No ${Cause.name.toLowerCase()} exists with that fieldName: ${fieldName} and fieldValue ${fieldValue}`);
    }
    return result[0];
  }

  // custom static implementation getByFilter
  public static async getByFilter(queryParams: { filter?: any, sort?: any }, user: CurrentUser): Promise<Cause | Cause[]> {
    const userFilter = getAmbassadorUserFilter(user);
    const complexQuery: any = {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_CAUSE,
        // add userFilter
        ...userFilter,
        // spread arbitrary query filter
        ...queryParams.filter,
      },
      // fields: (queryParams.fields) ? queryParams.fields : undefined,
      sort: (queryParams.sort) ? queryParams.sort : undefined,
    };
    const resultSet: Cause | Cause[] = await Cause.query(Cause, complexQuery);
    return resultSet;
  }
}
