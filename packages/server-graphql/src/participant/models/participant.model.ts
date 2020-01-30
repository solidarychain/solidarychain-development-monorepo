import { Field, ID, ObjectType } from 'type-graphql';
import { x509Identities } from './x509Identities.model';

@ObjectType()
export default class Participant {
  @Field(type => ID)
  id: string;

  @Field()
  public name: string;

  @Field()
  public msp: string;

  // TODO: use x509Identities from common package
  @Field(type => [x509Identities])
  public identities: x509Identities[];
}
