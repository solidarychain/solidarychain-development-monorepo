import { appConstants as c, entitySchema, x509Identities } from '@solidary-network/common-cc';
import { Participant } from '@solidary-network/participant-cc';
import { ConvectorModel, FlatConvectorModel, ReadOnly, Required, Validate } from '@worldsibu/convector-core';
import * as yup from 'yup';
import { AssetType } from './enums';
import { assetTypeSchema } from './validation';
import { Entity } from '.';

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

  @Validate(yup.string().matches(c.REGEX_LOCATION))
  public location: string;

  // TODO: tags
  @Validate(yup.array().of(yup.string()))
  public tags: string[];
    
  @Validate(yup.object().nullable())
  public metaData: any;

  @Validate(yup.object().nullable())
  public metaDataInternal: any;

  // TODO: change to owner
  @Required()
  @Validate(entitySchema)
  public owner: Entity;

  // TODO: use owner identities
  // @Required()
  // @Validate(yup.array(x509Identities.schema()))
  // public ownerIdentities: Array<FlatConvectorModel<x509Identities>>;

  @Required()
  @Validate(yup.number())
  public createdDate: number;

  @Required()
  @Validate(Participant.schema())
  public participant: FlatConvectorModel<Participant>;

  @Required()
  @Validate(yup.array(x509Identities.schema()))
  public identities: Array<FlatConvectorModel<x509Identities>>;
}
