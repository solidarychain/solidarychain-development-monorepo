import { Field, ID, ObjectType } from 'type-graphql';
import { x509Identities } from '../../common/models/x509Identities.model';
import { Validate, IsDefined } from 'class-validator';
import * as yup from 'yup';

@ObjectType()
export default class Participant {
  @Field(type => ID)
  @IsDefined()
  id: string;

  @Field()
  public name: string;

  @Field()
  public msp: string;

  // TODO
  @Field()
  @IsDefined()
  public participant: Participant;

  @Field(type => [x509Identities])
  @IsDefined()
  public identities: x509Identities[];

  @Validate(yup.number())
  @IsDefined()
  public created: number;

}
