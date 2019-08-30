import { appConstants as c } from '@convector-rest-sample/common';
import { ConvectorModel, Default, ReadOnly, Required, Validate, FlatConvectorModel } from '@worldsibu/convector-core';
import * as yup from 'yup';
import { Participant } from 'participant-cc';

export class Attribute extends ConvectorModel<Attribute>{
  @ReadOnly()
  @Required()
  public readonly type = c.CONVECTOR_MODEL_PATH_ATTRIBUTE;

  @Required()
  public content: any;

  @Required()
  @ReadOnly()
  @Validate(yup.number())
  public issuedDate: number;

  public expiresDate: Date;

  @Default(false)
  @Validate(yup.boolean())
  public expired: boolean;

  @Required()
  @Validate(yup.string())
  public certifierID: string;
}

export class Person extends ConvectorModel<Person> {
  @ReadOnly()
  @Required()
  public readonly type = c.CONVECTOR_MODEL_PATH_PERSON;

  @Required()
  @Validate(yup.string())
  public firstname: string;

  @Required()
  @Validate(yup.string())
  public lastname: string;

  @Required()
  @Validate(yup.string())
  public username: string;

  @Required()
  @Validate(yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[1-9a-zA-Z]/, 'Password can only contain Latin letters and numbers.')
  )
  public password: string;

  @Required()
  @Validate(yup.string()
  .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email')
  )
  public email: string;

  @Validate(yup.array(Attribute.schema()))
  public attributes: Array<Attribute>;

  @Default(['USER'])
  @Validate(yup.array().of(yup.string()))
  public roles: Array<String>;

  @Required()
  @Validate(Participant.schema())
  public participant: FlatConvectorModel<Participant>;
}
