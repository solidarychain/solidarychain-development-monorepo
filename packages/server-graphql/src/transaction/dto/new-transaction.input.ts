import { Entity, ResourceType, TransactionType } from '@solidary-network/transaction-cc';
import { IsDefined, IsNumber } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';

@InputType()
export class NewTransactionInput {
  // optional: generated automatically, but can optionally be used
  @Field({ nullable: true })
  public id: string;

  // above is equal dto/new-x.input.ts and models/x.model.ts
  // minus input and output type, and new-x-input don't have participant, identities and createdDate

  @Field()
  @IsDefined()
  public transactionType: TransactionType;

  @Field()
  @IsDefined()
  public resourceType: ResourceType;

  // different from x.model.ts
  @Field(type => GraphQLJSONObject)
  @IsDefined()
  public input?: Entity;

  // different from x.model.ts
  @Field(type => GraphQLJSONObject)
  @IsDefined()
  public output?: Entity;

  @Field()
  @IsDefined()
  public assetId: string;

  @Field()
  @IsDefined()
  @IsNumber()
  public quantity: number;

  @Field()
  @IsDefined()
  public currency: string;

  @Field()
  @IsDefined()
  public location: string;

  // TODO: tags
  @Field(type => [String], { nullable: true })
  public tags: string[];

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsDefined()
  public metaData: any;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsDefined()
  public metaDataInternal: any;
}
