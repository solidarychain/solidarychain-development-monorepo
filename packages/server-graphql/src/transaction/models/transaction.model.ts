import { Entity, ResourceType, TransactionType } from '@solidary-chain/transaction-cc';
import { IsDefined, IsNumber, Validate } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, ID, ObjectType } from 'type-graphql';
import * as yup from 'yup';
import { EntityResult } from '../../common/models';
import { Participant } from '../../participant/models/participant.model';
import { Goods } from '../../common/models';

@ObjectType()
export class Transaction {
  @Field(type => ID)
  id: string;

  // above is equal dto/new-x.input.ts and models/x.model.ts
  // minus input and output type, and new-x-input don't have participant, identities and createdDate

  @Field()
  @IsDefined()
  public transactionType: TransactionType;

  @Field()
  @IsDefined()
  public resourceType: ResourceType;

  // WARN different from model, must be a GraphQLJSONObject in input and EntityResult in model
  @Field(type => EntityResult)
  @IsDefined()
  input?: Entity;

  // WARN different from model, must be a GraphQLJSONObject in input and EntityResult in model
  @Field(type => EntityResult)
  @IsDefined()
  output?: Entity;

  @Field({ nullable: true })
  @IsNumber()
  public quantity: number;

  @Field({ nullable: true })
  public currency: string;

  @Field({ nullable: true })
  public location: string;

  @Field(type => [String], { nullable: true })
  public tags?: string[];

  @Field(type => GraphQLJSONObject, { nullable: true })
  public metaData: any;

  @Field(type => GraphQLJSONObject, { nullable: true })
  public metaDataInternal: any;

  @Field({ nullable: true })
  @IsDefined()
  public participant: Participant;

  // hide it from graphql stuff, this way we won't expose fingerprints
  // @Field(type => [x509Identities], { nullable: true })
  // @IsDefined()
  // public identities: x509Identities[];

  @Field()
  @IsDefined()
  @Validate(yup.number)
  public createdDate: number;

  @Field({ nullable: true })
  @IsDefined()
  public createdByPersonId: string;

  // optional: transfer assets

  @Field({ nullable: true })
  public assetId: string;

  // optional: transfer goods
  @Field(type => [Goods], { nullable: true })
  public goods?: Goods[];
}
