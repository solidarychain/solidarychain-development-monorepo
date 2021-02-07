import { Optional } from '@nestjs/common';
import { AssetType } from '@solidary-chain/asset-cc';
import { Entity } from '@solidary-chain/transaction-cc';
import { IsDefined, IsOptional, IsUUID } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';

@InputType()
export class NewAssetInput {
  // optional: generated automatically, but can optionally be used
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  id: string;

  // above is equal dto/new-x.input.ts and models/x.model.ts
  // minus participant, identities and createdDate

  @Field()
  @IsDefined()
  name: string;

  @Field()
  @IsDefined()
  assetType: AssetType;

  @Field(type => [String], { nullable: true })
  @Optional()
  ambassadors: string[];

  // WARN different from model, must be a GraphQLJSONObject in input and EntityResult in model
  @Field(type => GraphQLJSONObject)
  @IsDefined()
  owner?: Entity;

  @Field({ nullable: true })
  @IsOptional()
  @IsDefined()
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
}
