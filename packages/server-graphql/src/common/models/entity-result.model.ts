import { IsDefined } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';

/**
 * EntityResult as a subclass Entity with common Entity fields,
 * common for all participant, person and cause models
 */

// tslint:disable-next-line: max-classes-per-file
@ObjectType()
class Entity {
  @Field(type => ID)
  id: string;

  @Field()
  @IsDefined()
  type: string;

  @Field()
  @IsDefined()
  createdDate: number;

  // hide it from graphql stuff, this way we won't expose fingerprints
  // @IsDefined()
  // @Field(type => [x509Identities])
  // identities: x509Identities[];
}

// tslint:disable-next-line: max-classes-per-file
@ObjectType()
export class EntityResult {
  @Field()
  entity: Entity;
}
