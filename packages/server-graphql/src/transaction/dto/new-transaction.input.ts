import { Entity, ResourceType, TransactionType } from '@solidary-chain/transaction-cc';
import { IsDefined, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';
import { GoodsInput } from './goods.input';

@InputType()
export class NewTransactionInput {
  // optional: generated automatically, but can optionally be used
  @IsUUID()
  @Field({ nullable: true })
  @IsOptional()
  id: string;

  // above is equal dto/new-x.input.ts and models/x.model.ts
  // minus input and output type, and new-x-input don't have participant, identities and createdDate

  @Field()
  @IsDefined()
  transactionType: TransactionType;

  @Field()
  @IsDefined()
  resourceType: ResourceType;

  // WARN different from model, must be a GraphQLJSONObject in input and EntityResult in model
  @Field(type => GraphQLJSONObject)
  @IsDefined()
  input?: Entity;

  // WARN different from model, must be a GraphQLJSONObject in input and EntityResult in model
  @Field(type => GraphQLJSONObject)
  @IsDefined()
  output?: Entity;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @Field({ nullable: true })
  @IsOptional()
  currency: string;

  @Field({ nullable: true })
  @IsOptional()
  location: string;

  @Field(type => [String], { nullable: true })
  @IsOptional()
  tags?: string[];

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  metaData: any;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  metaDataInternal: any;

  // optional: transfer assets

  @Field({ nullable: true })
  @IsOptional()
  assetId: string;

  // optional: transfer goods, use goods here to be more intuitive for graphql users
  @Field(type => [GoodsInput], { nullable: true })
  goods?: GoodsInput[];
}
