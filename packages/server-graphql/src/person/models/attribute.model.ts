import { Field, ID, ObjectType } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { IsDefined } from 'class-validator';

@ObjectType()
export class Attribute {
  @Field(type => ID)
  @IsDefined()
  id: string;

  @Field(type => GraphQLJSONObject, { nullable: true })
  content?: any;

  @Field({ nullable: true })
  issuedDate?: number;

  @Field({ nullable: true })
  expiresDate?: Date;

  @Field({ nullable: true })
  expired?: boolean;

  @Field({ nullable: true })
  certifierID?: string;
}
