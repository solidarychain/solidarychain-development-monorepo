import { Entity, ResourceType, TransactionType } from '@solidary-network/transaction-cc';
import { IsDefined, IsNumber, Validate } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, ID, ObjectType } from 'type-graphql';
import * as yup from 'yup';
import { EntityResult, x509Identities } from '../../common/models';
import { Participant } from '../../participant/models/participant.model';

@ObjectType()
export class Transaction {
  @Field(type => ID)
  id: string;

  // above is equal dto/new-x.input.ts and models/x.model.ts
  // minus input and output type, and new-x-input don't have participant, identities and createdDate

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

  // TODO: tags
  @Field(type => String, { nullable: true })
  public tags: string[];

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsDefined()
  metaData: any;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsDefined()
  metaDataInternal: any;

  @Field({ nullable: true })
  @IsDefined()
  public participant: Participant;

  @Field(type => [x509Identities], { nullable: true })
  @IsDefined()
  public identities: x509Identities[];

  @Field()
  @IsDefined()
  // @Validate(yup.number())
  @Validate(yup.number)
  public createdDate: number;

}
