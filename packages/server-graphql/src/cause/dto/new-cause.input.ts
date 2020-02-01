import * as yup from 'yup';
import { IsDefined, Validate, IsDate, IsOptional } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';
import { Entity } from '@solidary-network/transaction-cc';

@InputType()
export default class NewCauseInput {
  // optional: generated automatically, but can optionally be used
  @Field({ nullable: true })
  public id: string;

  // above is equal dto/new-x.input.ts and models/x.model.ts
  // minus input and output type, and new-x-input don't have participant, identities and created

  @Field()
  @IsDefined()
  public name: string;

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
  @IsDefined()
  public location: string;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsDefined()
  public metaData: any;

  // different from x.model.ts
  @Field(type => GraphQLJSONObject)
  @IsDefined()
  public input?: Entity;

}
