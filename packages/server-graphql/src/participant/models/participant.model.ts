import { Field, ID, ObjectType } from 'type-graphql';
import { x509Identities } from '../../common/models';
import { Validate, IsDefined } from 'class-validator';
import * as yup from 'yup';
import { Optional } from '@nestjs/common';

@ObjectType()
export class Participant {
  @Field(type => ID)
  @IsDefined()
  public id: string;

  @Field()
  public code: string;

  @Field()
  public name: string;

  @Field(type => [String], { nullable: true })
  @Optional()
  public ambassadors: string[];

  @Field()
  public msp: string;

  @Field({nullable: true})
  @IsDefined()
  public participant: Participant;

  @Field(type => [x509Identities])
  @IsDefined()
  public identities: x509Identities[];

  @Field()
  @IsDefined()
  @Validate(yup.number)
  public createdDate: number;

}
