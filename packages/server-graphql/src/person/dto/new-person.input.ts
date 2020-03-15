import { IsDefined, IsNumber, IsOptional, MaxLength, IsUUID } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';

// this serves has the master for person.model and convector person.model in citizen card properties

@InputType()
export class NewPersonInput {
  // optional: generated automatically, but can optionally be used
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  public id: string;

  // generated automatically, but can optionally be used
  @Field({ nullable: true })
  // @IsDefined()
  public username: string;

  // generated automatically, but can optionally be used
  @Field({ nullable: true })
  // @IsDefined()
  public password: string;

  // generated automatically, but can optionally be used
  @Field({ nullable: true })
  // @IsEmail()
  // @IsDefined()
  public email: string;

  // extended non citizenCard data

  @Field({ nullable: true })
  // @IsDefined()
  public mobilePhone?: number;

  @Field({ nullable: true })
  // @IsDefined()
  public postal?: string;

  @Field({ nullable: true })
  // @IsDefined()
  public city?: string;

  @Field({ nullable: true })
  // @IsDefined()
  public region?: string;

  @Field({ nullable: true })
  // @IsDefined()
  public geoLocation?: string;

  @Field({ nullable: true })
  // @IsDefined()
  public timezone?: string;

  @Field({ nullable: true })
  // @IsDefined()
  public personalInfo?: string;

  @Field({ nullable: true })
  // @IsDefined()
  public internalInfo?: string;

  // store future profile and reputation average object
  @Field(type => GraphQLJSONObject, { nullable: true })
  // @IsDefined()
  public profile?: any;

  // citizenCard data: copy from personModel and add @IsOptional

  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  public firstname?: string;

  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  public lastname?: string;

  // M
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  @MaxLength(20)
  public gender?: string;

  // 1,81
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  @IsNumber()
  public height?: number;

  // Alberto
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  public fatherFirstname?: string;

  // De Andrade Monteiro
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  public fatherLastname?: string;

  // Maria Da Graça De Oliveira Mendes
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  public motherFirstname?: string;

  // Monteiro
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  public motherLastname?: string;

  // 19 12 1971
  @Field(type => Date, { nullable: true })
  @IsDefined()
  // @IsDate() don't enable on new-x-input's
  @IsOptional()
  public birthDate?: Date;

  // PRT
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  public nationality?: string;

  // PRT
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  public country?: string;

  // 09879462 0 ZZ3
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  public documentNumber?: string;

  // Cartão De Cidadão
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  public documentType?: string;

  // 006.007.23
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  public cardVersion?: string;

  // 08 05 2018
  @Field(type => Date, { nullable: true })
  @IsDefined()
  // @IsDate() don't enable on new-x-input's
  @IsOptional()
  public emissionDate?: Date;

  // 08 05 2028
  @Field(type => Date, { nullable: true })
  @IsDefined()
  // @IsDate() don't enable on new-x-input's
  @IsOptional()
  public expirationDate?: Date;

  // República Portuguesa
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  public emittingEntity?: string;

  // 098794620
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  public identityNumber?: string;

  // 182692124
  @Field()
  @IsDefined()
  @IsOptional()
  public fiscalNumber?: string;

  // 11103478242
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  public socialSecurityNumber?: string;

  // 285191659
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  public beneficiaryNumber?: string;

  // 0000036014662658
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  public pan?: string;

  // CRCiv. Figueira da Foz
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  public requestLocation?: string;

  @Field({ nullable: true })
  @IsOptional()
  public otherInformation!: string;
}
