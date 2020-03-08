import { Field, ID, ObjectType } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { IsDefined } from 'class-validator';

@ObjectType()
export class Attribute {
  @Field(type => ID)
  @IsDefined()
  id: string;

  @Field(type => GraphQLJSONObject, { nullable: true })
  public content?: any;

  @Field({ nullable: true })
  public issuedDate?: number;

  @Field({ nullable: true })
  public expiresDate?: Date;

  @Field({ nullable: true })
  public expired?: boolean;

  @Field({ nullable: true })
  public certifierID?: string;
}
