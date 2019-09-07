// tslint:disable: max-classes-per-file
import { IsDefined } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import Participant from '../../participant/models/participant.model';
import Attribute from './attribute.model';

// TODO: add yup validation

@ObjectType()
export default class Person {
  @Field(type => ID)
  @IsDefined()
  id: string;

  @Field()
  @IsDefined()
  public firstname: string;

  @Field()
  @IsDefined()
  public lastname: string;

  @Field()
  @IsDefined()
  public username: string;

  @Field()
  public email: string;

  @Field(type => [Attribute], { nullable: true })
  public attributes?: Attribute[];

  // TODO: users ENUM
  @Field(type => String, { defaultValue: 'USER' })
  public roles: string[];

  @Field()
  @IsDefined()
  public participant: Participant;
}
