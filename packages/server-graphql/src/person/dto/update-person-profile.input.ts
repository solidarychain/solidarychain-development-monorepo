import { IsOptional, IsUUID } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdatePersonProfileInput {
  @Field()
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  // @IsEmail()
  email: string;

  // extended non citizenCard data

  @Field({ nullable: true })
  mobilePhone?: string;

  @Field({ nullable: true })
  postal?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  region?: string;

  @Field({ nullable: true })
  geoLocation?: string;

  @Field({ nullable: true })
  timezone?: string;

  @Field({ nullable: true })
  personalInfo?: string;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  metaData: any;
}
