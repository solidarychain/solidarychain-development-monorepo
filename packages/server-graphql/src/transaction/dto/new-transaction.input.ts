import { Entity, ResourceType, TransactionType } from '@solidary-network/transaction-cc';
import { IsDefined, IsNumber, IsEmpty, IsUUID, IsOptional } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';

@InputType()
export class NewTransactionInput {
  // optional: generated automatically, but can optionally be used
  @IsOptional()
  @IsUUID()
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

  // WARN different from model, must be a GraphQLJSONObject in input and EntityResult in model
  @Field(type => GraphQLJSONObject)
  @IsDefined()
  public input?: Entity;

  // WARN different from model, must be a GraphQLJSONObject in input and EntityResult in model
  @Field(type => GraphQLJSONObject)
  @IsDefined()
  public output?: Entity;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  public quantity?: number;

  @Field({ nullable: true })
  @IsOptional()
  public currency: string;

  @Field({ nullable: true })
  @IsOptional()
  public location: string;

  @Field(type => [String], { nullable: true })
  @IsOptional()
  public tags?: string[];

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

  // optional: transfer assets

  @Field({ nullable: true })
  @IsOptional()
  public assetId: string;
}
