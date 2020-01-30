import { IsDefined } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { x509Identities } from '../../common/models/x509Identities.model';

/**
 * EntityResult as a subclass Entity with common Entity fields
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
  created: number;

  @IsDefined()
  @Field(type => [x509Identities])
  public identities: x509Identities[];
}

// tslint:disable-next-line: max-classes-per-file
@ObjectType()
export default class EntityResult {
  @Field()
  entity: Entity;
}
