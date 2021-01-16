import { appConstants as c, x509Identities, GenericBalance, Goods, CurrentUser, getAmbassadorUserFilter } from '@solidary-chain/common-cc';
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

  @Validate(yup.string().matches(c.REGEX_EMAIL, c.YUP_MESSAGE_INVALID_EMAIL))
  public email: string;

  @Validate(yup.string().matches(c.REGEX_FISCAL_NUMBER, c.YUP_MESSAGE_INVALID_FISCAL_NUMBER))
  public fiscalNumber: string;

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

  @Validate(GenericBalance.schema())
  public fundsBalance: GenericBalance;

  @Validate(GenericBalance.schema())
  public volunteeringHoursBalance: GenericBalance;

  @Validate(yup.array(Goods.schema()))
  public goodsStock: Array<FlatConvectorModel<Goods>>;

  // above implementation is equal in all models, only change the type and CONVECTOR_MODEL_PATH_${MODEL}
  // WARN in participants and persons is different we have custom getByFilter functions in getById

  // custom static implementation getById
  public static async getById(id: string, user: CurrentUser): Promise<Participant> {
    let resultSet: Participant | Participant[] = await this.getByFilter({ filter: { _id: id } }, user);
    // try get by code
    if (!resultSet[0]) {
      resultSet = await this.getByFilter({ filter: { 'code': id } }, user);
    }
    // try get by fiscalNumber
    if (!resultSet[0]) {
      resultSet = await this.getByFilter({ filter: { 'fiscalNumber': id } }, user);
    }
    if (!resultSet || !resultSet[0] || !resultSet[0].id) {
      throw new Error(`No ${Participant.name.toLowerCase()} exists with that id ${id}`);
    }
    // return only one record in findById
    return resultSet[0];
  }

  // custom static implementation getByField
  public static async getByField(fieldName: string, fieldValue: string, user: CurrentUser): Promise<Participant | Participant[]> {
    const resultSet: Participant | Participant[] = await this.getByFilter({ filter: { [fieldName]: fieldValue } }, user);
    if (!resultSet || !resultSet[0] || !resultSet[0].id) {
      throw new Error(`No ${Participant.name.toLowerCase()} exists with that fieldName: ${fieldName} and fieldValue ${fieldValue}`);
    }
    // return recordSet
    return resultSet;
  }

  // custom static implementation getByFilter
  public static async getByFilter(queryParams: { filter?: any, sort?: any }, user: CurrentUser): Promise<Participant | Participant[]> {
    const userFilter = getAmbassadorUserFilter(user);
    const complexQuery: any = {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_PARTICIPANT,
        // add userFilter
        ...userFilter,
        // spread arbitrary query filter
        ...queryParams.filter,
      },
      // fields: (queryParams.fields) ? queryParams.fields : undefined,
      sort: (queryParams.sort) ? queryParams.sort : undefined,
    };
    const resultSet: Participant | Participant[] = await Participant.query(Participant, complexQuery);
    // return recordSet
    return resultSet;
  }
}
