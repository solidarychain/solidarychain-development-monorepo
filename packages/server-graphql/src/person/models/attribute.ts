import { Field, ID, ObjectType } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

// TODO: add yup validation

@ObjectType()
export class Attribute {
  @Field(type => ID)
  id: string;

  // @Required()
  @Field(type => GraphQLJSONObject)
  public content: any;

  // @Required()
  // @ReadOnly()
  // @Validate(yup.number())
  @Field()
  public issuedDate: number;

  @Field()
  public expiresDate: Date;

  // @Default(false)
  // @Validate(yup.boolean())
  @Field({ nullable: true })
  public expired: boolean;

  // @Required()
  // @Validate(yup.string())
  @Field()
  public certifierID: string;
}
