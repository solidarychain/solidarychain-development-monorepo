import { Entity } from '@solidary-chain/transaction-cc';
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
  id: string;

  // above is equal dto/new-x.input.ts and models/x.model.ts
  // minus startDate, endDate, participant, identities and createdDate

  @Field()
  @IsDefined()
  name: string;

  @Field({ nullable: true })
  email?: string;

  @Field(type => [String], { nullable: true })
  @Optional()
  ambassadors: string[];

  @Field(type => Date, { nullable: true })
  @IsDefined()
  // @IsDate() don't enable on new-x-input's
  @IsOptional()
  startDate?: Date;

  @Field(type => Date, { nullable: true })
  @IsDefined()
  // @IsDate() don't enable on new-x-input's
  @IsOptional()
  endDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDefined()
  location: string;

  @Field(type => [String], { nullable: true })
  @Optional()
  tags: string[];

  @Field(type => GraphQLJSONObject, { nullable: true })
  @Optional()
  metaData: any;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @Optional()
  metaDataInternal: any;

  // WARN different from model, must be a GraphQLJSONObject in input and EntityResult in model
  @Field(type => GraphQLJSONObject)
  @IsDefined()
  input?: Entity;
}
