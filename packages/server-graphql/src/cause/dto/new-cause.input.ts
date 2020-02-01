import * as yup from 'yup';
import { IsDefined, Validate } from 'class-validator';
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
  name: string;

  @Validate(yup.number())
  public startDate: number;

  @Validate(yup.number())
  public endDate: number;

  @Field()
  @IsDefined()
  location: string;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsDefined()
  metaData: any;

  // different from x.model.ts
  @Field(type => GraphQLJSONObject)
  @IsDefined()
  input?: Entity;

}
