// tslint:disable: max-classes-per-file
import { IsDefined, IsDate, MaxLength, IsNumber, Validate } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import Participant from '../../participant/models/participant.model';
import Attribute from './attribute.model';
import { UserRoles } from '@solidary-network/common';
import { GraphQLJSONObject } from 'graphql-type-json';
import { x509Identities } from '../../common/models/x509Identities.model';
import * as yup from 'yup';

@ObjectType()
export default class Person {
  // non citizenCard data
  @Field(type => ID)
  @IsDefined()
  id: string;

  @Field({ nullable: true })
  @IsDefined()
  public username?: string;

  // not exposed
  public password: string;

  @Field({ nullable: true })
  public email?: string;

  // TODO add attributes to new-person.input.ts
  @Field(type => [Attribute], { nullable: true })
  public attributes?: Attribute[];

  // TODO add roles to new-person.input.ts
  @Field(type => String, { defaultValue: UserRoles.User })
  public roles: string[];

  @Field()
  @IsDefined()
  public participant: Participant;

  @Field(type => [x509Identities])
  @IsDefined()
  public identities: x509Identities[];

  @Field()
  @IsDefined()
  @Validate(yup.number())
  public createdDate: number;

  // extended non citizenCard data

  @Field(type => Date)
  @IsDefined()
  @IsDate()
  public registrationDate: Date;

  @Field({ nullable: true })
  @IsDefined()
  public mobilePhone?: number;

  @Field({ nullable: true })
  @IsDefined()
  public postal?: string;

  @Field({ nullable: true })
  @IsDefined()
  public city?: string;

  @Field({ nullable: true })
  @IsDefined()
  public region?: string;

  @Field({ nullable: true })
  @IsDefined()
  public geoLocation?: string;

  @Field({ nullable: true })
  @IsDefined()
  public timezone?: string;

  @Field({ nullable: true })
  @IsDefined()
  public personalInfo?: string;

  @Field({ nullable: true })
  @IsDefined()
  public internalInfo?: string;

  // store future profile and reputation average object
  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsDefined()
  public profile?: any;

  // citizenCard data

  @Field({ nullable: true })
  @IsDefined()
  public firstname?: string;

  @Field({ nullable: true })
  @IsDefined()
  public lastname?: string;

  // M
  @Field({ nullable: true })
  @IsDefined()
  @MaxLength(20)
  public gender?: string;

  // 1,81
  @Field({ nullable: true })
  @IsDefined()
  @IsNumber()
  public height?: number;

  // Alberto
  @Field({ nullable: true })
  @IsDefined()
  public fatherFirstname?: string;

  // De Andrade Monteiro
  @Field({ nullable: true })
  @IsDefined()
  public fatherLastname?: string;

  // Maria Da Graça De Oliveira Mendes
  @Field({ nullable: true })
  @IsDefined()
  public motherFirstname?: string;

  // Monteiro
  @Field({ nullable: true })
  @IsDefined()
  public motherLastname?: string;

  // 19 12 1971
  @Field(type => Date, { nullable: true })
  @IsDefined()
  @IsDate()
  public birthDate?: Date;

  // PRT
  @Field({ nullable: true })
  @IsDefined()
  public nationality?: string;

  // PRT
  @Field({ nullable: true })
  @IsDefined()
  public country?: string;

  // 09879462 0 ZZ3
  @Field({ nullable: true })
  @IsDefined()
  public documentNumber?: string;

  // Cartão De Cidadão
  @Field({ nullable: true })
  @IsDefined()
  public documentType?: string;

  // 006.007.23
  @Field({ nullable: true })
  @IsDefined()
  public cardVersion?: string;

  // 08 05 2018
  @Field({ nullable: true })
  @IsDefined()
  @IsDate()
  public emissionDate?: Date;

  // 08 05 2028
  @Field(type => Date, { nullable: true })
  @IsDefined()
  @IsDate()
  public expirationDate?: Date;

  // República Portuguesa
  @Field({ nullable: true })
  @IsDefined()
  public emittingEntity?: string;

  // 098794620
  @Field({ nullable: true })
  @IsDefined()
  public identityNumber?: string;

  // 182692124
  @Field()
  @IsDefined()
  public fiscalNumber?: string;

  // 11103478242
  @Field({ nullable: true })
  @IsDefined()
  public socialSecurityNumber?: string;

  // 285191659
  @Field({ nullable: true })
  @IsDefined()
  public beneficiaryNumber?: string;

  // 0000036014662658
  @Field({ nullable: true })
  @IsDefined()
  public pan?: string;

  // CRCiv. Figueira da Foz
  @Field({ nullable: true })
  @IsDefined()
  public requestLocation?: string;

  @Field({ nullable: true })
  public otherInformation!: string;
}
