import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, ID, ObjectType } from 'type-graphql';
import { IsDefined, IsNumber } from 'class-validator';
import { TransactionType,ResourceType } from '@solidary-network/transaction-cc';
// import { Person } from '@solidary-network/person-cc';
// import { Cause } from '@solidary-network/cause-cc';
// import { Participant } from '@solidary-network/participant-cc';

@ObjectType()
export default class Transaction {
  @Field(type => ID)
  id: string;

  // above is equal dto/new-transaction.input.ts and models/transaction.model.ts

  @Field()
  @IsDefined()
  transactionType: TransactionType;

  @Field()
  @IsDefined()
  resourceType: ResourceType;

  // TODO: Participant | Person | Cause;
  @Field(type => GraphQLJSONObject)
  @IsDefined()
  input?: any;

  // TODO: Participant | Person | Cause;
  @Field(type => GraphQLJSONObject)
  @IsDefined()
  output?: any;

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
