import { appConstants as c, x509Identities } from '@solidary-network/common';
import { ConvectorModel, FlatConvectorModel, ReadOnly, Required, Validate } from '@worldsibu/convector-core';
import * as yup from 'yup';

export class Participant extends ConvectorModel<Participant> {
  @ReadOnly()
  public readonly type = c.CONVECTOR_MODEL_PATH_PARTICIPANT;

  @Required()
  @Validate(yup.string())
  public name: string;

  @Required()
  @Validate(yup.string())
  public msp: string;

  // @Required()
  @Validate(Participant.schema())
  public participant: FlatConvectorModel<Participant>;
  
  @Required()
  @Validate(yup.array(x509Identities.schema()))
  public identities: Array<FlatConvectorModel<x509Identities>>;

  @Required()
  @Validate(yup.number())
  public created: number;
}
