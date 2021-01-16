import { CurrentUser } from '../interfaces';
import { ConvectorModel, ReadOnly, Required, Validate } from '@worldsibu/convector-core';
import * as yup from 'yup';
import { appConstants as c } from '../constants';
import { GenericBalance } from './generic-balance.model';

export class Goods extends ConvectorModel<Goods> {
  @ReadOnly()
  @Required()
  public readonly type = c.CONVECTOR_MODEL_PATH_GOODS;

  @Required()
  @Validate(yup.string())
  public code: string;

  @Validate(yup.string())
  public barCode: string;

  @Required()
  @Validate(yup.string())
  public name: string;

  @Validate(yup.string())
  public description: string;

  @Validate(yup.array().of(yup.string()))
  public tags: string[];

  @Validate(GenericBalance.schema())
  public balance?: GenericBalance;

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

  // above implementation is equal in all models, only change the type and CONVECTOR_MODEL_PATH_${MODEL}

  // custom static implementation getById
  public static async getById(id: string, user: CurrentUser): Promise<Goods> {
    const result: Goods | Goods[] = await this.getByFilter({ filter: { _id: id } }, user);
    if (!result || !result[0] || !result[0].id) {
      throw new Error(`No ${Goods.name.toLowerCase()} exists with that id ${id}`);
    }
    return result[0];
  }

  // custom static implementation getByField
  public static async getByField(fieldName: string, fieldValue: string, user: CurrentUser): Promise<Goods | Goods[]> {
    const result: Goods | Goods[] = await this.getByFilter({ filter: { [fieldName]: fieldValue } }, user);
    if (!result || !result[0] || !result[0].id) {
      throw new Error(`No ${Goods.name.toLowerCase()} exists with that fieldName: ${fieldName} and fieldValue ${fieldValue}`);
    }
    return result[0];
  }

  // custom static implementation getByFilter
  public static async getByFilter(queryParams: { filter?: any, sort?: any }, user: CurrentUser): Promise<Goods | Goods[]> {
    // TODO: add userFilter
    // const userFilter = getAmbassadorUserFilter(user);
    const complexQuery: any = {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_TRANSACTION,
        // add userFilter
        // TODO: add userFilter
        // ...userFilter,
        // spread arbitrary query filter
        ...queryParams.filter,
      },
      // fields: (queryParams.fields) ? queryParams.fields : undefined,
      sort: (queryParams.sort) ? queryParams.sort : undefined,
    };
    const resultSet: Goods | Goods[] = await Goods.query(Goods, complexQuery);
    return resultSet;
  }
}
