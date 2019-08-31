import { Field, ID, ObjectType } from 'type-graphql';

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
  // public identities: Array<FlatConvectorModel<x509Identities>>;
}
