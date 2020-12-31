import { ConvectorModel, ReadOnly, Required, Validate } from '@worldsibu/convector-core';
import * as yup from 'yup';
import { appConstants as c } from '../constants';

export class GenericBalance extends ConvectorModel<GenericBalance>{
  constructor() {
    super();
    this.debit = 0;
    this.credit = 0;
    this.balance = 0;
  }

  @ReadOnly()
  @Required()
  public readonly type = c.CONVECTOR_MODEL_PATH_ENTITY_BALANCE;

  @Required()
  @Validate(yup.number())
  public debit: number;
  
  @Required()
  @Validate(yup.number())
  public credit: number;

  @Required()
  @Validate(yup.number())
  public balance: number;
}