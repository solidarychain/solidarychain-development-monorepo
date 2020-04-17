import { Optional } from '@nestjs/common';
import { IsDefined, Validate } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, ID, ObjectType } from 'type-graphql';
import * as yup from 'yup';
import { EntityBalance } from '../../common/models';

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

  @Field(type => GraphQLJSONObject, { nullable: true })
  public metaData: any;

  @Field(type => GraphQLJSONObject, { nullable: true })
  public metaDataInternal: any;

  // hide it from graphql stuff, this way we won't expose fingerprints
  // @Field(type => [x509Identities])
  // @IsDefined()
  // public identities: x509Identities[];

  @Field()
  @IsDefined()
  @Validate(yup.number)
  public createdDate: number;

  @Field({ nullable: true })
  @IsDefined()
  public createdByPersonId: string;

  @Field(type => EntityBalance)
  @IsDefined()
  public fundsBalance?: EntityBalance;

  @Field(type => EntityBalance)
  @IsDefined()
  public volunteeringHoursBalance?: EntityBalance;
}
