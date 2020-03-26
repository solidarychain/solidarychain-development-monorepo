import { appConstants as c, entitySchema } from '@solidary-network/common-cc';
import { ConvectorModel, FlatConvectorModel, ReadOnly, Required, Validate } from '@worldsibu/convector-core';
import * as yup from 'yup';
import { x509Identities } from '@solidary-network/common-cc';
import { Entity } from './types';
import { Participant } from '@solidary-network/participant-cc';

export class Cause extends ConvectorModel<Cause> {
  @ReadOnly()
  public readonly type = c.CONVECTOR_MODEL_PATH_CAUSE;

  @Required()
  @Validate(yup.string())
  public name: string;

  // owner : send by graphql api
  @Validate(yup.string())
  public ambassadorUsername: string;

  @Validate(yup.number())
  public startDate: number;

  @Validate(yup.number())
  public endDate: number;

  @Validate(yup.string().matches(c.REGEX_LOCATION))
  public location: string;

  @Validate(yup.array().of(yup.string()))
  public tags: string[];
    
  @Validate(yup.object().nullable())
  public metaData: any;

  @Required()
  @Validate(entitySchema)
  public input: Entity;

  @Required()
  @Validate(yup.number())
  public createdDate: number;

  @Required()
  @Validate(Participant.schema())
  public participant: FlatConvectorModel<Participant>;

  @Required()
  @Validate(yup.array(x509Identities.schema()))
  public identities: Array<FlatConvectorModel<x509Identities>>;

  // above implementation is equal in all models, only change the type and CONVECTOR_MODEL_PATH_${MODEL}

  // custom static implementation getById
  public static async getById(id: string): Promise<Cause> {
    const result: Cause | Cause[] = await this.getByFilter({ _id: id });
    return (result) ? result[0] : null;
  }

  // custom static implementation getByField
  public static async getByField(fieldName: string, fieldValue: string): Promise<Cause | Cause[]> {
    return await this.getByFilter({ [fieldName]: fieldValue });
  }

  // custom static implementation getByFilter
  public static async getByFilter(filter: any): Promise<Cause | Cause[]> {
    return await this.query(Cause, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_CAUSE,
        ...filter,
      }
    });
  }
}
