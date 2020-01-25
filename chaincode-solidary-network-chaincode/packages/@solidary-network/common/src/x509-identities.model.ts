import { ConvectorModel, ReadOnly, Validate, Required } from '@worldsibu/convector-core';
import { appConstants as c } from './constants';
import * as yup from 'yup';

export class x509Identities extends ConvectorModel<x509Identities>{
  @ReadOnly()
  public readonly type = c.CONVECTOR_MODEL_PATH_X509IDENTITY;

  @Validate(yup.boolean())
  @Required()
  status: boolean;

  @Validate(yup.string())
  @Required()
  fingerprint: string;
}
