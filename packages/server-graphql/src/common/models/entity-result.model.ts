import { IsDefined } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { x509Identities } from './x509Identities.model';

/**
 * EntityResult as a subclass Entity with common Entity fields,
 * common for all participant, person and cause models
 */

// tslint:disable-next-line: max-classes-per-file
@ObjectType()
class Entity {
  @Field(type => ID)
  public id: string;

  @Field()
  @IsDefined()
  public type: string;

  @Field()
  @IsDefined()
  public createdDate: number;

  @IsDefined()
  @Field(type => [x509Identities])
  public identities: x509Identities[];
}

// tslint:disable-next-line: max-classes-per-file
@ObjectType()
export class EntityResult {
  @Field()
  public entity: Entity;
}
