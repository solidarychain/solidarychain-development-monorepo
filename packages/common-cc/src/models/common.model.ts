import { appConstants as c } from '../constants';
import { ConvectorModel, ReadOnly, Required } from '@worldsibu/convector-core';
import { CurrentUser } from '../interfaces';

export class Common extends ConvectorModel<Common> {
  @ReadOnly()
  @Required()
  public readonly type = c.CONVECTOR_MODEL_PATH_COMMON;

  // below implementations are different, they have type argument, we use common model like generic to have access to richQueries in common modules

  // custom static implementation getById
  public static async getById(type: string, id: string, user: CurrentUser): Promise<Common> {
    let result: Common | Common[] = await this.getByFilter(type, { _id: id }, user);
    // try get by code
    if (!result[0]) {
      result = await this.getByFilter(type, { 'code': id }, user);
    }
    // try get by fiscalNumber
    if (!result[0]) {
      result = await this.getByFilter(type, { 'fiscalNumber': id }, user);
    }
    // try get by mobilePhone
    if (!result[0]) {
      result = await this.getByFilter(type, { 'mobilePhone': id }, user);
    }
    if (!result || !result[0] || !result[0].id) {
      throw new Error(`No participant/person exists with that id ${id}`);
    }
    return result[0];
  }

  // custom static implementation getByField
  public static async getByField(type: string, fieldName: string, fieldValue: string, user: CurrentUser): Promise<Common | Common[]> {
    const result: Common | Common[] =  await this.getByFilter(type, { [fieldName]: fieldValue }, user);
    if (!result || !result[0] || !result[0].id) {
      throw new Error(`No participant/person exists with that fieldName: ${fieldName} and fieldValue ${fieldValue}`);
    }
    return result[0];
  }

  // custom static implementation getByFilter
  public static async getByFilter(type: string, filter: any, user: CurrentUser): Promise<Common | Common[]> {
    return await this.query(Common, {
      selector: {
        type,
        ...filter,
      }
    });
  }
}
