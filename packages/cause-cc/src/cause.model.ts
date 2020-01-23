import { appConstants as c, entitySchema } from '@solidary-network/common';
import { ConvectorModel, FlatConvectorModel, ReadOnly, Required, Validate } from '@worldsibu/convector-core';
import * as yup from 'yup';
import { x509Identities } from '@solidary-network/common';
import { Entity } from './types';

export class Cause extends ConvectorModel<Cause> {
  @ReadOnly()
  public readonly type = c.CONVECTOR_MODEL_PATH_CAUSE;

  @Required()
  @Validate(yup.string())
  public name: string;

  @Validate(yup.array(x509Identities.schema()))
  public identities: Array<FlatConvectorModel<x509Identities>>;

  @Required()
  @Validate(entitySchema)
  public input: Entity;

  @Required()
  @Validate(yup.number())
  public created: number;
}
