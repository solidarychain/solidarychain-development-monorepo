import { Field, ID, ObjectType } from 'type-graphql';

// TODO: add yup validation

@ObjectType()
// tslint:disable-next-line: class-name
export class x509Identities {
  @Field(type => ID, { nullable: true })
  id?: string;

  // @Validate(yup.boolean())
  // @Required()
  @Field()
  status: boolean;

  // @Validate(yup.string())
  // @Required()
  @Field()
  fingerprint: string;
}
