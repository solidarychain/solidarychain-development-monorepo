import { AssetType } from '@solidary-network/asset-cc';
import { Entity } from '@solidary-network/transaction-cc';
import { IsDefined, IsOptional, Validate } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, ID, ObjectType } from 'type-graphql';
import * as yup from 'yup';
import { x509Identities, EntityResult } from '../../common/models';
import { Participant } from '../../participant/models/participant.model';

@ObjectType()
export class Asset {
  @Field(type => ID)
  public id: string;

  // above is equal dto/new-x.input.ts and models/x.model.ts
  // minus participant, identities and createdDate

  @Field()
  @IsDefined()
  public name: string;

  @Field()
  @IsDefined()
  public assetType: AssetType;

  // WARN different from model, must be a GraphQLJSONObject in input and EntityResult in model
  @Field(type => EntityResult)
  @IsDefined()
  public owner?: Entity;

  @Field({ nullable: true })
  @IsOptional()
  @IsDefined()
  public location: string;

  @Field(type => [String], { nullable: true })
  @IsOptional()
  public tags: string[];

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  public metaData: any;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  public metaDataInternal: any;

  @Field()
  @IsDefined()
  public participant: Participant;

  // hide it from graphql stuff, this way we won't expose fingerprints
  // @Field(type => [x509Identities])
  // @IsDefined()
  // public identities: x509Identities[];

  @Field()
  @IsDefined()
  @Validate(yup.number)
  public createdDate: number;

  @Field({ nullable: true })
  public createdByPersonId: string;

}
