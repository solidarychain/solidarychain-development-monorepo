import { Optional } from '@nestjs/common';
import { IsNumber, IsOptional } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';

@InputType()
export class GoodsInput {
  @Field()
  public code: string;

  @Field()
  @Optional()
  public barCode: string;

  @Field()
  public name: string;

  @Field()
  @Optional()
  public description: string;

  @Field({ nullable: true })
  @IsNumber()
  public quantity?: number;

  @Field(type => String, { nullable: true })
  @Optional()
  public tags: string[];

  @Field(type => GraphQLJSONObject, { nullable: true })
  @Optional()
  public metaData: any;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @Optional()
  public metaDataInternal: any;
}
