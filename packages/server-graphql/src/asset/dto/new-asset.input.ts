import { AssetType } from '@solidary-network/asset-cc';
import { Entity } from '@solidary-network/transaction-cc';
import { IsDefined } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';

@InputType()
export class NewAssetInput {
  // optional: generated automatically, but can optionally be used
  @Field({ nullable: true })
  public id: string;

  // above is equal dto/new-x.input.ts and models/x.model.ts
  // minus input and output type, and new-x-input don't have participant, identities and createdDate

  @Field()
  @IsDefined()
  public name: string;

  @Field()
  @IsDefined()
  assetType: AssetType;

  @Field({ nullable: true })
  @IsDefined()
  public location: string;

  // TODO: tags
  @Field(type => [String], { nullable: true })
  public tags: string[];

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsDefined()
  public metaData: any;

  // different from x.model.ts
  @Field(type => GraphQLJSONObject)
  @IsDefined()
  public owner?: Entity;

}
