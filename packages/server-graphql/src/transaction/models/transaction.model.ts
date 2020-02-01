import { x509Identities } from '../../common/models/x509Identities.model';
import { Entity, ResourceType, TransactionType } from '@solidary-network/transaction-cc';
import { IsDefined, IsNumber, Validate } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, ID, ObjectType } from 'type-graphql';
import * as yup from 'yup';
import EntityResult from '../../common/models/entity-result.model';
import Participant from '../../participant/models/participant.model';

@ObjectType()
export default class Transaction {
  @Field(type => ID)
  id: string;

  // above is equal dto/new-x.input.ts and models/x.model.ts
  // minus input and output type, and new-x-input don't have participant, identities and created

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

  // TODO: added
  @Field({nullable: true})
  @IsDefined()
  public participant: Participant;

  // TODO: added
  @Field(type => [x509Identities], {nullable: true})
  @IsDefined()
  public identities: x509Identities[];

  // TODO: added
  @Field()
  @IsDefined()
  @Validate(yup.number())
  public created: number;

}
