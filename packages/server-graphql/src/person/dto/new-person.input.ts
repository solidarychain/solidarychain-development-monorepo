import { IsEmail, MaxLength, IsDefined } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class NewPersonInput {
  @Field()
  @IsDefined()
  @MaxLength(12)
  id: string;

  @Field()
  @IsDefined()
  @MaxLength(40)
  firstname: string;

  @Field()
  @IsDefined()
  @MaxLength(40)
  lastname: string;

  @Field()
  @IsDefined()
  @MaxLength(15)
  username: string;

  @Field()
  @IsDefined()
  @MaxLength(15)
  password: string;

  @Field()
  @IsEmail()
  email: string;
}
