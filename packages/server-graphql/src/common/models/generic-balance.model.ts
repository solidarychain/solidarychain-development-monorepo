import { IsDefined } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class GenericBalance {
  @Field()
  @IsDefined()
  public debit: number;

  @Field()
  @IsDefined()
  public credit: number;

  @Field()
  @IsDefined()
  public balance: number;
}
