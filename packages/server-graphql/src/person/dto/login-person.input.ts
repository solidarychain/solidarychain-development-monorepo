import { IsDefined, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export default class LoginPersonInput {
  @Field()
  @IsDefined()
  @MaxLength(15)
  username: string;

  @Field()
  @IsDefined()
  @MaxLength(15)
  password: string;
}
