import { Entity, ResourceType, TransactionType } from '@solidary-network/transaction-cc';
import { IsDefined, IsNumber } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, ID, ObjectType } from 'type-graphql';
import EntityResult from './entity-result.model';

@ObjectType()
export default class Transaction {
  @Field(type => ID)
  id: string;

  // above is equal dto/new-transaction.input.ts and models/transaction.model.ts
  // minus input and output type

  @Field()
  @IsDefined()
  transactionType: TransactionType;

  @Field()
  @IsDefined()
  resourceType: ResourceType;

  // @Field(type => GraphQLJSONObject)
  // @IsDefined()
  // input?: Entity;
  @Field(type => EntityResult)
  @IsDefined()
  input?: Entity;

  @Field(type => EntityResult)
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
