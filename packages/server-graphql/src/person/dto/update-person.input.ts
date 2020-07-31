import { UserRoles } from '@solidary-chain/common-cc';
import { IsOptional, IsUUID } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdatePersonInput {
  @Field()
  @IsUUID()
  id: string;

  @Field(type => [String], { defaultValue: UserRoles.User })
  roles: string[];

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  metaDataInternal: any;
}
