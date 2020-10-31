import { Optional } from '@nestjs/common';
import { IsDefined, Validate } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, ID, ObjectType } from 'type-graphql';
import * as yup from 'yup';
import { GenericBalance } from '../../common/models';
import { Goods } from '../../common/models';

@ObjectType()
export class Participant {
  @Field(type => ID)
  @IsDefined()
  id: string;

  @Field()
  code: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  email?: string;

  @Field()
  @IsDefined()
  fiscalNumber: string;

  @Field(type => [String], { nullable: true })
  @Optional()
  ambassadors: string[];

  @Field()
  msp: string;

  @Field({nullable: true})
  @IsDefined()
  participant: Participant;

  @Field(type => GraphQLJSONObject, { nullable: true })
  metaData: any;

  @Field(type => GraphQLJSONObject, { nullable: true })
  metaDataInternal: any;

  // hide it from graphql stuff, this way we won't expose fingerprints
  // @Field(type => [x509Identities])
  // @IsDefined()
  // identities: x509Identities[];

  @Field()
  @IsDefined()
  @Validate(yup.number)
  createdDate: number;

  @Field({ nullable: true })
  @IsDefined()
  createdByPersonId: string;

  @Field(type => GenericBalance)
  @IsDefined()
  fundsBalance: GenericBalance;

  @Field(type => GenericBalance)
  @IsDefined()
  volunteeringHoursBalance: GenericBalance;

  @Field(type => [Goods], { nullable: true })
  goodsStock?: Goods[];
}
