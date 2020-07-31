import { Optional } from '@nestjs/common';
import { AssetType } from '@solidary-chain/asset-cc';
import { Entity } from '@solidary-chain/transaction-cc';
import { IsDefined, IsOptional, Validate } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, ID, ObjectType } from 'type-graphql';
import * as yup from 'yup';
import { EntityResult } from '../../common/models';
import { Participant } from '../../participant/models/participant.model';

@ObjectType()
export class Asset {
  @Field(type => ID)
  id: string;

  // above is equal dto/new-x.input.ts and models/x.model.ts
  // minus participant, identities and createdDate

  @Field()
  @IsDefined()
  name: string;

  @Field({ nullable: true })
  @Optional()
  description: string;

  @Field()
  @IsDefined()
  assetType: AssetType;

  @Field(type => [String], { nullable: true })
  @Optional()
  ambassadors: string[];

  // WARN different from model, must be a GraphQLJSONObject in input and EntityResult in model
  @Field(type => EntityResult)
  @IsDefined()
  owner?: Entity;

  @Field({ nullable: true })
  @IsOptional()
  location: string;

  @Field(type => [String], { nullable: true })
  @IsOptional()
  tags: string[];

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  metaData: any;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  metaDataInternal: any;

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
}
