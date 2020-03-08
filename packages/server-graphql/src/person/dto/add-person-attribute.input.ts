import { IsDefined } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class AddPersonAttributeInput {
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
