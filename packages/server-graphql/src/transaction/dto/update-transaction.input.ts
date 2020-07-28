import { IsOptional, IsUUID } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateTransactionInput {
  @Field()
  @IsUUID()
  public id: string;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  public metaDataInternal: any;
}
