import { Field, ID, ObjectType } from 'type-graphql';
import { x509Identities } from './x509Identities.model';

// TODO: add yup validation

@ObjectType()
export class Participant {
  @Field(type => ID)
  id: string;

  // @ReadOnly()
  // @Required()
  // @Validate(yup.string())
  @Field()
  public name: string;

  // @ReadOnly()
  // @Validate(yup.string())
  @Field()
  public msp: string;

  // @Validate(yup.array(x509Identities.schema()))
  @Field(type => [x509Identities])
  public identities: x509Identities[];
}
