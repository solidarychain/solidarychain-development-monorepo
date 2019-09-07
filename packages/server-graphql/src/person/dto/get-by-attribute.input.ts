import { IsDefined, MaxLength } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';

@InputType()
export default class GetByAttributeInput {
  @Field()
  @IsDefined()
  @MaxLength(125)
  id: string;

  @Field(type => GraphQLJSONObject, { nullable: true })
  value?: any;
}
