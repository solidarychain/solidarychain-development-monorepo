// tslint:disable: max-classes-per-file
import { Field, ID, ObjectType } from 'type-graphql';
import { Attribute } from './attribute';
import { Participant } from '../../participant/models/participant';

// TODO: add yup validation

@ObjectType()
export class Person {
  @Field(type => ID)
  id: string;

  // @Required()
  // @Validate(yup.string())
  @Field()
  public firstname: string;

  // @Required()
  // @Validate(yup.string())
  // @Field({ nullable: true })
  @Field()
  public lastname: string;

  // @Required()
  // @Validate(yup.string())
  // @Field({ nullable: true })
  @Field()
  public username: string;

  // @Required()
  // @Validate(yup.string()
  //   .min(8, 'Password is too short - should be 8 chars minimum.')
  //   .matches(/[1-9a-zA-Z]/, 'Password can only contain Latin letters and numbers.')
  // )
  @Field()
  public password: string;

  // @Required()
  // @Validate(yup.string()
  //   .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email')
  // )
  @Field()
  public email: string;

  // @Validate(yup.array(Attribute.schema()))
  @Field(type => [Attribute])
  public attributes: Attribute[];

  // @Default(['USER'])
  // @Validate(yup.array().of(yup.string()))
  // TODO: users ENUM
  @Field(type => String, { defaultValue: 'USER' })
  public roles: string[];

  // @Required()
  // @Validate(Participant.schema())
  @Field()
  public participant: Participant;
}
