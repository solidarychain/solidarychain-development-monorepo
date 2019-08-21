import { appConstants as c } from '@convector-rest-sample/common';
import { ConvectorModel, FlatConvectorModel, ReadOnly, Required, Validate } from '@worldsibu/convector-core';
import * as yup from 'yup';

export class x509Identities extends ConvectorModel<x509Identities>{
  @ReadOnly()
  // TODO:
  // public readonly type = 'io.worldsibu.examples.x509identity';
  public readonly type = c.CONVECTOR_MODEL_PATH_X509IDENTITY;

  @Validate(yup.boolean())
  @Required()
  status: boolean;
  @Validate(yup.string())
  @Required()
  fingerprint: string;
}

export class Participant extends ConvectorModel<Participant> {
  @ReadOnly()
  // TODO:
  // public readonly type = 'io.worldsibu.examples.participant';
  public readonly type = c.CONVECTOR_MODEL_PATH_PARTICIPANT;

  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public name: string;

  @ReadOnly()
  @Validate(yup.string())
  public msp: string;

  @Validate(yup.array(x509Identities.schema()))
  public identities: Array<FlatConvectorModel<x509Identities>>;
}
