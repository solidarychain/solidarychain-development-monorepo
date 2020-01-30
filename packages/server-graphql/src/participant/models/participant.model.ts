import { Field, ID, ObjectType } from 'type-graphql';
import { x509Identities } from '../../common/models/x509Identities.model';

@ObjectType()
export default class Participant {
  @Field(type => ID)
  id: string;

  @Field()
  public name: string;

  @Field()
  public msp: string;

  @Field(type => [x509Identities])
  public identities: x509Identities[];
}
