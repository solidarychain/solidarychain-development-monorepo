import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default class Transaction {
  @Field(type => ID)
  id: string;

  @Field()
  public name: string;

  @Field()
  public msp: string;
}
