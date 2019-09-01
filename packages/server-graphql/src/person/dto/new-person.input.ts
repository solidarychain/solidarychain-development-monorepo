import { IsOptional, Length, MaxLength, IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { Attribute } from '../models/attribute';

@InputType()
export class NewPersonInput {
  @Field()
  @MaxLength(12)
  id: string;

  @Field()
  @MaxLength(40)
  firstname: string;

  @Field()
  @MaxLength(40)
  lastname: string;

  @Field()
  @MaxLength(15)
  username: string;

  @Field()
  @MaxLength(15)
  password: string;

  @Field()
  @IsEmail()
  email: string;

  // @IsOptional()
  // @Field(type => [Attribute])
  // attributes?: Attribute[];

  // @IsOptional()
  // @Field(type => [String])
  // roles?: string[];
}
