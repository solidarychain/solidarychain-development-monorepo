import { appConstants as c } from '@solidary-network/common';
import { ConvectorModel, FlatConvectorModel, ReadOnly, Required, Validate } from '@worldsibu/convector-core';
import * as yup from 'yup';
import { x509Identities } from '@solidary-network/common';

export class Participant extends ConvectorModel<Participant> {
  @ReadOnly()
  public readonly type = c.CONVECTOR_MODEL_PATH_PARTICIPANT;

  @Required()
  @Validate(yup.string())
  public name: string;

  @Validate(yup.string())
  public msp: string;

  @Required()
  @Validate(yup.number())
  public created: number;

  // TODO: added
  @Required()
  @Validate(Participant.schema())
  public participant: FlatConvectorModel<Participant>;

  @Required()
  @Validate(yup.array(x509Identities.schema()))
  public identities: Array<FlatConvectorModel<x509Identities>>;

}
