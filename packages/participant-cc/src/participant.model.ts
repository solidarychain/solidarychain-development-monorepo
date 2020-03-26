import { appConstants as c, x509Identities } from '@solidary-network/common-cc';
import { ConvectorModel, FlatConvectorModel, ReadOnly, Required, Validate } from '@worldsibu/convector-core';
import * as yup from 'yup';

export class Participant extends ConvectorModel<Participant> {
  @ReadOnly()
  public readonly type = c.CONVECTOR_MODEL_PATH_PARTICIPANT;

  @Required()
  @Validate(yup.string())
  public code: string;

  @Required()
  @Validate(yup.string())
  public name: string;

  // owner : send by graphql api
  @Validate(yup.string())
  public ambassadorUsername: string;

  @Required()
  @Validate(yup.string())
  public msp: string;

  // @Required() Don't enable here
  @Validate(Participant.schema())
  public participant: FlatConvectorModel<Participant>;

  @Required()
  @Validate(yup.array(x509Identities.schema()))
  public identities: Array<FlatConvectorModel<x509Identities>>;

  @Required()
  @Validate(yup.number())
  public createdDate: number;

  // above implementation is equal in all models, only change the type and CONVECTOR_MODEL_PATH_${MODEL}

  // custom static implementation getById
  public static async getById(id: string): Promise<Participant> {
    const result: Participant | Participant[] = await this.getByFilter({ _id: id });
    return (result) ? result[0] : null;
  }

  // custom static implementation getByField
  public static async getByField(fieldName: string, fieldValue: string): Promise<Participant | Participant[]> {
    return await this.getByFilter({ [fieldName]: fieldValue });
  }

  // custom static implementation getByFilter
  public static async getByFilter(filter: any): Promise<Participant | Participant[]> {
    return await this.query(Participant, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_PARTICIPANT,
        ...filter,
      }
    });
  }
}
