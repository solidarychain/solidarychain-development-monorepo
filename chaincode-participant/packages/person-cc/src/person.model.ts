import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core';

export class Attribute extends ConvectorModel<Attribute>{
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.attribute';

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
  public readonly type = 'io.worldsibu.person';

  @Required()
  @Validate(yup.string())
  public firstName: string;

  @Required()
  @Validate(yup.string())
  public lastName: string;

  @Required()
  @Validate(yup.string())
  public userName: string;

  @Required()
  @Validate(yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[1-9a-zA-Z]/, 'Password can only contain Latin letters and numbers.')
  )
  public passWord: string;

  @Required()
  @Validate(yup.string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email')
  )
  public email: string;

  @Validate(yup.array(Attribute.schema()))
  public attributes: Array<Attribute>;
}
