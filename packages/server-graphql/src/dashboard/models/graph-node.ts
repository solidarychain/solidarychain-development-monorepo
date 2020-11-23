import { IsDefined } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { NodeColor, NodeType } from '../enums';

@ObjectType()
export class GraphNode {
  @Field(type => ID)
  @IsDefined()
  id: string;

  @Field()
  @IsDefined()
  label: string;

  @Field({ nullable: true })
  desc?: string;

  @Field({ nullable: true })
  nodeVal?: number;

  @Field({ nullable: true })
  color?: NodeColor | string;

  @Field({ nullable: true })
  autoColorBy?: string;

  @Field({ nullable: true })
  group?: NodeType;
}
