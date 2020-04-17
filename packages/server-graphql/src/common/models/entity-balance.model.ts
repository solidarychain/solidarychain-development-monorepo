import { IsDefined } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class EntityBalance {
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
