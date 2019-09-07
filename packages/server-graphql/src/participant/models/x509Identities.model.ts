import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
// tslint:disable-next-line: class-name
export class x509Identities {
  @Field(type => ID, { nullable: true })
  id?: string;

  @Field()
  status: boolean;

  @Field()
  fingerprint: string;
}
