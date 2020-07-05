import { appConstants as c, x509Identities, GenericBalance, Goods } from '@solidary-chain/common-cc';
import { ConvectorModel, FlatConvectorModel, ReadOnly, Required, Validate } from '@worldsibu/convector-core';
import * as yup from 'yup';

export class Participant extends ConvectorModel<Participant> {
  @ReadOnly()
  @Required()
  public readonly type = c.CONVECTOR_MODEL_PATH_PARTICIPANT;

  @Validate(yup.string())
  public code: string;

  @Validate(yup.string())
  public name: string;

  // @Validate(yup.string().matches(c.REGEX_EMAIL, c.YUP_MESSAGE_INVALID_EMAIL))
  @Validate(yup.string())
  public email: string;

  @Validate(yup.array().of(yup.string().nullable()))
  public ambassadors: string[];

  @Validate(yup.string())
  public msp: string;

  // @Required() Don't enable here
  @Validate(Participant.schema())
  public participant: FlatConvectorModel<Participant>;

  @Validate(yup.array(x509Identities.schema()))
  public identities: Array<FlatConvectorModel<x509Identities>>;

  @Validate(yup.object().nullable())
  public metaData: any;

  @Validate(yup.object().nullable())
  public metaDataInternal: any;

  @Validate(yup.number())
  public createdDate: number;

  // persisted with loggedPersonId
  @Validate(yup.string())
  public createdByPersonId?: string;

  // send by graphql api
  @Validate(yup.string())
  public loggedPersonId?: string;

  @Validate(GenericBalance.schema())
  public fundsBalance: GenericBalance;
  
  @Validate(GenericBalance.schema())
  public volunteeringHoursBalance: GenericBalance;

  @Validate(yup.array(Goods.schema()))
  public goodsStock: Array<FlatConvectorModel<Goods>>;

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
