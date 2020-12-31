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
  public static async getById(id: string): Promise<Goods> {
    const result: Goods | Goods[] = await this.getByFilter({ _id: id });
    return (result) ? result[0] : null;
  }

  // custom static implementation getByField
  public static async getByField(fieldName: string, fieldValue: string): Promise<Goods | Goods[]> {
    return await this.getByFilter({ [fieldName]: fieldValue });
  }

  // custom static implementation getByFilter
  public static async getByFilter(filter: any): Promise<Goods | Goods[]> {
    return await this.query(Goods, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_GOODS,
        ...filter,
      }
    });
  }
}
