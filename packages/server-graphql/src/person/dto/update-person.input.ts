import { UserRoles } from '@solidary-chain/common-cc';
import { IsOptional, IsUUID } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';
import { Attribute } from '../models';

@InputType()
export class UpdatePersonInput {
  @Field()
  @IsUUID()
  public id: string;

  // TODO add attributes to new-person.input.ts
  // @Field(type => [Attribute], { nullable: true })
  // public attributes?: Attribute[];

  // TODO add roles to new-person.input.ts
  // TODO remove default value from bellow line
  @Field(type => [String], { defaultValue: UserRoles.User })
  public roles: string[];

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  public metaDataInternal: any;
}
