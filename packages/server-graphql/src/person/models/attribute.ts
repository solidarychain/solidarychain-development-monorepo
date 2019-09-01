import { Field, ID, ObjectType } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

// TODO: add yup validation

@ObjectType()
export class Attribute {
  @Field(type => ID)
  id: string;

  // @Required()
  @Field(type => GraphQLJSONObject, { nullable: true })
  public content?: any;

  // @Required()
  // @ReadOnly()
  // @Validate(yup.number())
  @Field({ nullable: true })
  public issuedDate?: number;

  @Field({ nullable: true })
  public expiresDate?: Date;

  // @Default(false)
  // @Validate(yup.boolean())
  @Field({ nullable: true })
  public expired?: boolean;

  // @Required()
  // @Validate(yup.string())
  @Field({ nullable: true })
  public certifierID?: string;
}
