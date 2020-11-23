import { IsDefined } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { TransactionType } from '../enums';

@ObjectType()
export class GraphLink {
  @Field(type => ID)
  @IsDefined()
  source: string;

  @Field(type => ID)
  @IsDefined()
  target: string;

  @Field({ nullable: true })
  label?: string;

  @Field({ nullable: true })
  desc?: string;

  @Field({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  autoColorBy?: string;

  @Field({ nullable: true })
  linkWidth?: number;

  @Field({ nullable: true })
  group?: TransactionType;
}
