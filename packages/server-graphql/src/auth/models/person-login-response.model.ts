import { Field, ObjectType } from 'type-graphql';
import { IsDefined } from 'class-validator';
import Person from '../../person/models/person.model';

@ObjectType()
export default class PersonLoginResponse {
  @Field(type => Person)
  @IsDefined()
  user: Person;

  @Field()
  accessToken: string;
}
