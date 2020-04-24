import { Optional } from '@nestjs/common';
import { IsNumber, IsOptional } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { ID, Field, InputType } from 'type-graphql';

@InputType()
export class GoodsInput {
  // if not supplied by user, mutation auto-generate one for us
  @Field(type => ID, { nullable: true })
  @IsOptional()
  public id: string;

  @Field()
  public code: string;

  @Field({ nullable: true })
  @Optional()
  public barCode: string;

  @Field()
  public name: string;

  @Field({ nullable: true })
  @Optional()
  public description: string;

  @Field()
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
