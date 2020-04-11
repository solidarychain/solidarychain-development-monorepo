import { Entity } from '@solidary-network/transaction-cc';
import { IsDefined, IsOptional, IsUUID } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';
import { Optional } from '@nestjs/common';

@InputType()
export class NewCauseInput {
  // optional: generated automatically, but can optionally be used
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  public id: string;

  // above is equal dto/new-x.input.ts and models/x.model.ts
  // minus startDate, endDate, participant, identities and createdDate

  @Field()
  @IsDefined()
  public name: string;

  @Field(type => [String], { nullable: true })
  @Optional()
  public ambassadors: string[];

  @Field(type => Date, { nullable: true })
  @IsDefined()
  // @IsDate() don't enable on new-x-input's
  @IsOptional()
  public startDate?: Date;

  @Field(type => Date, { nullable: true })
  @IsDefined()
  // @IsDate() don't enable on new-x-input's
  @IsOptional()
  public endDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDefined()
  public location: string;

  @Field(type => [String], { nullable: true })
  @Optional()
  public tags: string[];

  @Field(type => GraphQLJSONObject, { nullable: true })
  @Optional()
  public metaData: any;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @Optional()
  public metaDataInternal: any;

  // this is used to pass loggedIn userId to fabric
  @Field({ nullable: true })
  @IsOptional()
  public loggedPersonId: string;

  // WARN different from model, must be a GraphQLJSONObject in input and EntityResult in model
  @Field(type => GraphQLJSONObject)
  @IsDefined()
  public input?: Entity;

}
