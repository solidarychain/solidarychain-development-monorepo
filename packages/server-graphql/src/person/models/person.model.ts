// tslint:disable: max-classes-per-file
import { UserRoles } from '@solidary-chain/common-cc';
import { IsDate, IsDefined, IsNumber, MaxLength, Validate } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, ID, ObjectType } from 'type-graphql';
import * as yup from 'yup';
import { GenericBalance } from '../../common/models';
import { Participant } from '../../participant/models';
import { Attribute } from './attribute.model';
import { Goods } from '../../common/models';

@ObjectType()
export class Person {
  @Field(type => ID)
  @IsDefined()
  id: string;

  // non citizenCard data

  @Field({ nullable: true })
  @IsDefined()
  username?: string;

  // not exposed
  password: string;

  @Field({ nullable: true })
  email?: string;

  @Field(type => [Attribute], { nullable: true })
  attributes?: Attribute[];

  @Field(type => [String], { defaultValue: UserRoles.ROLE_USER })
  roles: string[];

  @Field()
  @IsDefined()
  participant: Participant;

  // hide it from graphql stuff, this way we won't expose fingerprints
  // @Field(type => [x509Identities])
  // @IsDefined()
  // identities: x509Identities[];

  @Field()
  @IsDefined()
  @Validate(yup.number)
  createdDate: number;

  // TODO: can remove person don't use createdByPersonId
  // @Field({ nullable: true })
  // @IsDefined()
  // createdByPersonId: string;

  // extended non citizenCard data

  @Field(type => Date)
  @IsDefined()
  @IsDate()
  registrationDate: Date;

  @Field()
  @IsDefined()
  mobilePhone: string;

  @Field({ nullable: true })
  @IsDefined()
  postal?: string;

  @Field({ nullable: true })
  @IsDefined()
  city?: string;

  @Field({ nullable: true })
  @IsDefined()
  region?: string;

  @Field({ nullable: true })
  @IsDefined()
  geoLocation?: string;

  @Field({ nullable: true })
  @IsDefined()
  timezone?: string;

  @Field({ nullable: true })
  @IsDefined()
  personalInfo?: string;

  @Field(type => GraphQLJSONObject, { nullable: true })
  metaData: any;

  @Field(type => GraphQLJSONObject, { nullable: true })
  metaDataInternal: any;

  // store future profile and reputation average object
  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsDefined()
  profile?: any;

  @Field(type => GenericBalance)
  @IsDefined()
  fundsBalance: GenericBalance;

  @Field(type => GenericBalance)
  @IsDefined()
  volunteeringHoursBalance: GenericBalance;

  @Field(type => [Goods], { nullable: true })
  goodsStock?: Goods[];

  // citizenCard data

  @Field({ nullable: true })
  @IsDefined()
  firstName?: string;

  @Field({ nullable: true })
  @IsDefined()
  lastName?: string;

  // M
  @Field({ nullable: true })
  @IsDefined()
  @MaxLength(20)
  gender?: string;

  // 1,81
  @Field({ nullable: true })
  @IsDefined()
  @IsNumber()
  height?: number;

  // Alberto
  @Field({ nullable: true })
  @IsDefined()
  fatherFirstName?: string;

  // De Andrade Monteiro
  @Field({ nullable: true })
  @IsDefined()
  fatherLastName?: string;

  // Maria Da Graça De Oliveira Mendes
  @Field({ nullable: true })
  @IsDefined()
  motherFirstName?: string;

  // Monteiro
  @Field({ nullable: true })
  @IsDefined()
  motherLastName?: string;

  // 19 12 1971
  @Field(type => Date, { nullable: true })
  @IsDefined()
  @IsDate()
  birthDate?: Date;

  // PRT
  @Field({ nullable: true })
  @IsDefined()
  nationality?: string;

  // PRT
  @Field({ nullable: true })
  @IsDefined()
  country?: string;

  // 09879462 0 ZZ3
  @Field({ nullable: true })
  @IsDefined()
  documentNumber?: string;

  // Cartão De Cidadão
  @Field({ nullable: true })
  @IsDefined()
  documentType?: string;

  // 006.007.23
  @Field({ nullable: true })
  @IsDefined()
  cardVersion?: string;

  // 08 05 2018
  @Field({ nullable: true })
  @IsDefined()
  @IsDate()
  emissionDate?: Date;

  // 08 05 2028
  @Field(type => Date, { nullable: true })
  @IsDefined()
  @IsDate()
  expirationDate?: Date;

  // República Portuguesa
  @Field({ nullable: true })
  @IsDefined()
  emittingEntity?: string;

  // 098794620
  @Field({ nullable: true })
  @IsDefined()
  identityNumber?: string;

  // 182692124
  @Field()
  @IsDefined()
  fiscalNumber: string;

  // 11103478242
  @Field({ nullable: true })
  @IsDefined()
  socialSecurityNumber?: string;

  // 285191659
  @Field({ nullable: true })
  @IsDefined()
  beneficiaryNumber?: string;

  // 0000036014662658
  @Field({ nullable: true })
  @IsDefined()
  pan?: string;

  // CRCiv. Figueira da Foz
  @Field({ nullable: true })
  @IsDefined()
  requestLocation?: string;

  @Field({ nullable: true })
  otherInformation!: string;
}
