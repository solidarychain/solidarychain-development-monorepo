import { Optional } from '@nestjs/common';
import { IsOptional, IsUUID } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateParticipantInput {
  @Field()
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  email?: string;

  @Field(type => [String], { nullable: true })
  @Optional()
  ambassadors: string[];

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  metaData: any;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  metaDataInternal: any;
}
