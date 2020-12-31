import { IsDefined, IsOptional } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';
import { UserInfo } from '../types';

@InputType()
export class GetByComplexQueryInput {

  @Field(type => GraphQLJSONObject)
  @IsDefined()
  public filter: any;

  // used to try prevent problems with sort
  @Field(type => [String], { nullable: true })
  public fields?: string[];

  @Field(type => [GraphQLJSONObject], { nullable: true })
  public sort?: any;

  // TODO: create type in auth
  // this is used to pass logged info to fabric
  @Field(type => [GraphQLJSONObject], { nullable: true })
  @IsOptional()
  userInfo: UserInfo;
}
