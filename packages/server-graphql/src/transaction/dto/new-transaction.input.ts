import { Entity, ResourceType, TransactionType } from '@solidary-network/transaction-cc';
import { IsDefined, IsNumber } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';

@InputType()
export default class NewTransactionInput {
  // optional: generated automatically, but can optionally be used
  @Field({ nullable: true })
  public id: string;

  // above is equal dto/new-x.input.ts and models/x.model.ts
  // minus input and output type, and new-x-input don't have participant, identities and created

  @Field()
  @IsDefined()
  transactionType: TransactionType;

  @Field()
  @IsDefined()
  resourceType: ResourceType;

  // different from x.model.ts
  @Field(type => GraphQLJSONObject)
  @IsDefined()
  input?: Entity;

  // different from x.model.ts
  @Field(type => GraphQLJSONObject)
  @IsDefined()
  output?: Entity;

  @Field()
  @IsDefined()
  @IsNumber()
  quantity: number;

  @Field()
  @IsDefined()
  currency: string;

  @Field()
  @IsDefined()
  location: string;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsDefined()
  metaData: any;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsDefined()
  metaDataInternal: any;
}
