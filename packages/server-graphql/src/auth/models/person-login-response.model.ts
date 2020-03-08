import { Field, ObjectType } from 'type-graphql';
import { IsDefined } from 'class-validator';
import { Person } from '../../person/models';

@ObjectType()
export class PersonLoginResponse {
  @Field(type => Person)
  @IsDefined()
  user: Person;

  @Field()
  accessToken: string;
}
