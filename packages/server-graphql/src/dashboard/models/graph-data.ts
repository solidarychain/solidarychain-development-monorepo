// tslint:disable: max-classes-per-file
import { Field, ObjectType } from 'type-graphql';
import { GraphLink } from './graph-link';
import { GraphNode } from './graph-node';

@ObjectType()
export class GraphData {
  @Field(type => [GraphNode], { nullable: true })
  nodes: GraphNode[];

  @Field(type => [GraphLink], { nullable: true })
  links: GraphLink[];
}
