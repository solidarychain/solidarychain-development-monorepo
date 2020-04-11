import { AssetType } from '@solidary-network/asset-cc';
import { Entity } from '@solidary-network/transaction-cc';
import { IsDefined, IsOptional, IsUUID } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';
import { EntityResult } from '../../common/models';
import { Optional } from '@nestjs/common';

@InputType()
export class NewAssetInput {
  // optional: generated automatically, but can optionally be used
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  public id: string;

  // above is equal dto/new-x.input.ts and models/x.model.ts
  // minus participant, identities and createdDate

  @Field()
  @IsDefined()
  public name: string;

  @Field()
  @IsDefined()
  public assetType: AssetType;

  @Field(type => [String], { nullable: true })
  @Optional()
  public ambassadors: string[];

  // WARN different from model, must be a GraphQLJSONObject in input and EntityResult in model
  @Field(type => GraphQLJSONObject)
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

  // this is used to pass loggedIn userId to fabric
  @Field({ nullable: true })
  @IsOptional()
  public loggedPersonId: string;
}
