import { appConstants as c, entitySchema, CurrentUser, x509Identities, getOwnerAndAmbassadorUserFilter } from '@solidary-chain/common-cc';
import { Participant } from '@solidary-chain/participant-cc';
import { ConvectorModel, FlatConvectorModel, ReadOnly, Required, Validate } from '@worldsibu/convector-core';
import * as yup from 'yup';
import { AssetType } from './enums';
import { assetTypeSchema } from './validation';
import { Entity } from './types';

export class Asset extends ConvectorModel<Asset> {
  @ReadOnly()
  @Required()
  public readonly type = c.CONVECTOR_MODEL_PATH_ASSET;

  @Required()
  @Validate(yup.string())
  public name: string;

  // new: assetField
  @Validate(yup.string())
  public description: string;

  @Required()
  @Validate(assetTypeSchema)
  public assetType: AssetType;

  @Validate(yup.array().of(yup.string()))
  public ambassadors: string[];

  @Validate(yup.string().matches(c.REGEX_LOCATION, { excludeEmptyString: true }))
  public location: string;

  @Validate(yup.array().of(yup.string()))
  public tags: string[];

  @Required()
  @Validate(entitySchema)
  public owner: Entity;

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

  // above implementation is equal in all models, only change the type and CONVECTOR_MODEL_PATH_${MODEL}

  // custom static implementation getById
  public static async getById(id: string, user: CurrentUser): Promise<Asset> {
    const result: Asset | Asset[] = await this.getByFilter({ filter: { _id: id } }, user);
    if (!result || !result[0] || !result[0].id) {
      throw new Error(`No ${Asset.name.toLowerCase()} exists with that id ${id}`);
    }
    return result[0];
  }

  // custom static implementation getByField
  public static async getByField(fieldName: string, fieldValue: string, user: CurrentUser): Promise<Asset | Asset[]> {
    const result: Asset | Asset[] =  await this.getByFilter({ filter: { [fieldName]: fieldValue } }, user);
    if (!result || !result[0] || !result[0].id) {
      throw new Error(`No ${Asset.name.toLowerCase()} exists with that fieldName: ${fieldName} and fieldValue ${fieldValue}`);
    }
    return result[0];
  }

  // custom static implementation getByFilter
  public static async getByFilter(queryParams: { filter?: any, sort?: any }, user: CurrentUser): Promise<Asset | Asset[]> {
    const userFilter = getOwnerAndAmbassadorUserFilter(user);
    const complexQuery: any = {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_ASSET,
        // add userFilter
        ...userFilter,
        // spread arbitrary query filter
        ...queryParams.filter,
      },
      // fields: (queryParams.fields) ? queryParams.fields : undefined,
      sort: (queryParams.sort) ? queryParams.sort : undefined,
    };
    const resultSet: Asset | Asset[] = await Asset.query(Asset, complexQuery);
    return resultSet;
  }
}
