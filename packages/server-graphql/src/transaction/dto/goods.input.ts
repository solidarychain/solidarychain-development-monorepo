import { Optional } from '@nestjs/common';
import { IsNumber, IsOptional } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { ID, Field, InputType } from 'type-graphql';

@InputType()
export class GoodsInput {
  // if not supplied by user, mutation auto-generate one for us
  @Field(type => ID, { nullable: true })
  @IsOptional()
  id: string;

  @Field()
  code: string;

  @Field({ nullable: true })
  @Optional()
  barCode: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  @Optional()
  description: string;

  @Field()
  @IsNumber()
  quantity?: number;

  @Field(type => String, { nullable: true })
  @Optional()
  tags: string[];

  @Field(type => GraphQLJSONObject, { nullable: true })
  @Optional()
  metaData: any;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @Optional()
  metaDataInternal: any;
}
