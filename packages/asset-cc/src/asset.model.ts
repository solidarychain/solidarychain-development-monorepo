import { appConstants as c, entitySchema, x509Identities } from '@solidary-network/common-cc';
import { Participant } from '@solidary-network/participant-cc';
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

  @Required()
  @Validate(assetTypeSchema)
  public assetType: AssetType;

  @Validate(yup.array().of(yup.string()))
  public ambassadors: string[];

  @Validate(yup.string().matches(c.REGEX_LOCATION))
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
  
  // send by graphql api
  @Validate(yup.string())
  public loggedPersonId?: string;

  @Required()
  @Validate(Participant.schema())
  public participant: FlatConvectorModel<Participant>;

  // above implementation is equal in all models, only change the type and CONVECTOR_MODEL_PATH_${MODEL}

  // custom static implementation getById
  public static async getById(id: string): Promise<Asset> {
    const result: Asset | Asset[] = await this.getByFilter({ _id: id });
    return (result) ? result[0] : null;
  }

  // custom static implementation getByField
  public static async getByField(fieldName: string, fieldValue: string): Promise<Asset | Asset[]> {
    return await this.getByFilter({ [fieldName]: fieldValue });
  }

  // custom static implementation getByFilter
  public static async getByFilter(filter: any): Promise<Asset | Asset[]> {
    return await this.query(Asset, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_ASSET,
        ...filter,
      }
    });
  }
}
