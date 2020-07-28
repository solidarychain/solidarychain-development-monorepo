import { Optional } from '@nestjs/common';
import { IsOptional, IsUUID } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateAssetInput {
  @Field()
  @IsUUID()
  public id: string;

  @Field(type => [String], { nullable: true })
  @Optional()
  public ambassadors: string[];

  @Field(type => [String], { nullable: true })
  @IsOptional()
  public tags: string[];

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  public metaData: any;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  public metaDataInternal: any;
}
