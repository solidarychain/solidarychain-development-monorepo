import { appConstants as c } from './constants';
import { ConvectorModel, ReadOnly, Required } from '@worldsibu/convector-core';

export class Common extends ConvectorModel<Common> {
  @ReadOnly()
  @Required()
  public readonly type = c.CONVECTOR_MODEL_PATH_COMMON;

  // below implementations are different, they have type argument, we use common model like generic to have access to richQueries in common modules

  // custom static implementation getById
  public static async getById(type: string, id: string): Promise<Common> {
    const result: Common | Common[] = await this.getByFilter(type, { _id: id });
    return (result) ? result[0] : null;
  }

  // custom static implementation getByField
  public static async getByField(type: string, fieldName: string, fieldValue: string): Promise<Common | Common[]> {
    return await this.getByFilter(type, { [fieldName]: fieldValue });
  }

  // custom static implementation getByFilter
  public static async getByFilter(type: string, filter: any): Promise<Common | Common[]> {
    return await this.query(Common, {
      selector: {
        type,
        ...filter,
      }
    });
  }
}
