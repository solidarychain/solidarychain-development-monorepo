// tslint:disable: max-classes-per-file
import { IsDefined } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import Participant from '../../participant/models/participant.model';
import Attribute from './attribute.model';
import { UserRoles } from '@convector-sample/common';

@ObjectType()
export default class Person {
  @Field(type => ID)
  @IsDefined()
  id: string;

  // citizenCard data

  @Field()
  @IsDefined()
  public firstname: string;

  @Field()
  @IsDefined()
  public lastname: string;

  // M
  @Field()
  @IsDefined()
  public gender: string;

  // 1,81
  @Field()
  @IsDefined()
  public height: string;

  // Alberto
  @Field()
  @IsDefined()
  public fatherFirstname: string;

  // De Andrade Monteiro
  @Field()
  @IsDefined()
  public fatherLastname: string;

  // Maria Da Graça De Oliveira Mendes
  @Field()
  @IsDefined()
  public motherFirstname: string;

  // Monteiro
  @Field()
  @IsDefined()
  public motherLastname: string;

  // TODO: use DateTime
  // 19 12 1971
  @Field()
  @IsDefined()
  public birthDate: string;

  // PRT
  @Field()
  @IsDefined()
  public nationality: string;

  // PRT
  @Field()
  @IsDefined()
  public country: string;

  // 09879462 0 ZZ3
  @Field()
  @IsDefined()
  public documentNumber: string;

  // Cartão De Cidadão
  @Field()
  @IsDefined()
  public documentType: string;

  // 006.007.23
  @Field()
  @IsDefined()
  public cardVersion: string;

  // TODO: use DateTime
  // 08 05 2018
  @Field()
  @IsDefined()
  public emissionDate: string;

  // TODO: use DateTime
  // 08 05 2028
  @Field()
  @IsDefined()
  public expirationDate: string;

  // República Portuguesa
  @Field()
  @IsDefined()
  public emittingEntity: string;

  // 098794620
  @Field()
  @IsDefined()
  public identityNumber: string;

  // 182692124
  @Field()
  @IsDefined()
  public fiscalNumber: string;

  // 11103478242
  @Field()
  @IsDefined()
  public socialSecurityNumber: string;

  // 285191659
  @Field()
  @IsDefined()
  public beneficiaryNumber: string; 

  // 0000036014662658
  @Field()
  @IsDefined()
  public pan: string;

  // CRCiv. Figueira da Foz
  @Field()
  @IsDefined()
  public requestLocation: string;

  @Field()
  @IsDefined()
  public otherInformation: string;

  // non citizenCard data

  @Field()
  @IsDefined()
  public username: string;

  // not exposed
  public password: string;

  @Field()
  public email: string;

  @Field(type => [Attribute], { nullable: true })
  public attributes?: Attribute[];

  @Field(type => String, { defaultValue: UserRoles.User })
  public roles: string[];

  @Field()
  @IsDefined()
  public participant: Participant;
}
