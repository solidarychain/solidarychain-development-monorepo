import { Optional } from '@nestjs/common';
import { Entity } from '@solidary-chain/transaction-cc';
import { IsDefined, Validate } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, ID, ObjectType } from 'type-graphql';
import * as yup from 'yup';
import { EntityResult, GenericBalance } from '../../common/models';
import { Participant } from '../../participant/models';
import { Goods } from '../../common/models';

@ObjectType()
export class Cause {
  @Field(type => ID)
  id: string;

  // above is equal dto/new-x.input.ts and models/x.model.ts
  // minus startDate, endDate, participant, identities and createdDate

  @Field()
  @IsDefined()
  name: string;

  @Field({ nullable: true })
  email?: string;

  @Field(type => [String], { nullable: true })
  @Optional()
  ambassadors: string[];

  @Field({ nullable: true })
  @Optional()
  @Validate(yup.number)
  startDate: number;

  @Field({ nullable: true })
  @Optional()
  @Validate(yup.number)
  endDate: number;

  @Field({ nullable: true })
  @Optional()
  @IsDefined()
  location: string;

  @Field(type => String, { nullable: true })
  @Optional()
  tags: string[];

  @Field(type => GraphQLJSONObject, { nullable: true })
  @Optional()
  metaData: any;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @Optional()
  metaDataInternal: any;

  // WARN different from model, must be a GraphQLJSONObject in input and EntityResult in model
  @Field(type => EntityResult)
  @Optional()
  @IsDefined()
  input?: Entity;

  @Field()
  @IsDefined()
  participant: Participant;

  // hide it from graphql stuff, this way we won't expose fingerprints
  // @Field(type => [x509Identities])
  // @IsDefined()
  // identities: x509Identities[];

  @Field()
  @IsDefined()
  @Validate(yup.number)
  createdDate: number;

  @Field({ nullable: true })
  @IsDefined()
  createdByPersonId: string;

  @Field(type => GenericBalance)
  @IsDefined()
  fundsBalance: GenericBalance;

  @Field(type => GenericBalance)
  @IsDefined()
  volunteeringHoursBalance: GenericBalance;

  @Field(type => [Goods], { nullable: true })
  goodsStock?: Goods[];
}
