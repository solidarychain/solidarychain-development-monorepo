import { appConstants as c, entitySchema } from '@solidary-network/common';
import { ConvectorModel, FlatConvectorModel, ReadOnly, Required, Validate } from '@worldsibu/convector-core';
import * as yup from 'yup';
import { x509Identities } from '@solidary-network/common';
import { Entity } from './types';
import { Participant } from '@solidary-network/participant-cc';

export class Cause extends ConvectorModel<Cause> {
  @ReadOnly()
  public readonly type = c.CONVECTOR_MODEL_PATH_CAUSE;

  @Required()
  @Validate(yup.string())
  public name: string;

  @Validate(yup.number())
  public startDate: number;

  @Validate(yup.number())
  public endDate: number;

  @Validate(yup.string().matches(c.REGEX_LOCATION))
  public location: string;

  // TODO: tags
  @Validate(yup.array().of(yup.string()))
  public tags: Array<String>;
    
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

}
