import { Optional } from '@nestjs/common';
import { IsDefined, IsOptional, IsUUID, Length } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';

@InputType()
export class NewParticipantInput {
  // optional: generated automatically, but can optionally be used
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  public id: string;

  @Field()
  @IsDefined()
  @Length(3, 30)
  code: string;

  @Field()
  @IsDefined()
  @Length(3, 100)
  name: string;

  @Field({ nullable: true })
  public email?: string;

  @Field(type => [String], { nullable: true })
  @Optional()
  public ambassadors: string[];

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  public metaData: any;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  public metaDataInternal: any;

  // this is used to pass loggedIn userId to fabric
  @Field({ nullable: true })
  @IsOptional()
  public loggedPersonId: string;
}
