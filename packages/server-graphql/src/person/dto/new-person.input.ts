import { MaxLength, IsDefined, IsDate, IsNumber, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

// this serves has the master for person.model and convector person.model in citizen card properties

@InputType()
export default class NewPersonInput {
  // optional: generated automatically, but can optionally be used
  @Field({ nullable: true })
  @IsDefined()
  id: string;

  // generated automatically, but can optionally be used
  @Field({ nullable: true })
  @IsDefined()
  username: string;

  // generated automatically, but can optionally be used
  @Field({ nullable: true })
  @IsDefined()
  password: string;

  // generated automatically, but can optionally be used
  @Field({ nullable: true })
  // @IsEmail()
  @IsDefined()
  email: string;

  // extended non citizenCard data

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

  @Field()
  @IsDefined()
  public firstname: string;

  @Field()
  @IsDefined()
  public lastname: string;

  // M
  @Field()
  @IsDefined()
  @MaxLength(20)
  public gender: string;

  // 1,81
  @Field()
  @IsDefined()
  @IsNumber()
  public height: number;

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

  // 19 12 1971
  @Field(type => Date)
  @IsDefined()
  // @IsDate(): must be comment to work
  public birthDate: Date;

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

  // 08 05 2018
  @Field(type => Date)
  @IsDefined()
  // @IsDate(): must be comment to work
  public emissionDate: Date;

  // 08 05 2028
  @Field(type => Date)
  @IsDefined()
  // @IsDate(): must be comment to work
  public expirationDate: Date;

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

  @Field({ nullable: true })
  @IsDefined()
  public otherInformation!: string;
}
