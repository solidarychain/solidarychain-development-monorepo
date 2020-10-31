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
  id: string;

  // generated automatically, but can optionally be used
  @Field({ nullable: true })
  // @IsDefined()
  username: string;

  // generated automatically, but can optionally be used
  @Field({ nullable: true })
  // @IsDefined()
  password: string;

  @Field({ nullable: true })
  // @IsEmail()
  // @IsDefined()
  email: string;

  // extended non citizenCard data

  @Field()
  // @IsDefined()
  mobilePhone: string;

  @Field({ nullable: true })
  // @IsDefined()
  postal?: string;

  @Field({ nullable: true })
  // @IsDefined()
  city?: string;

  @Field({ nullable: true })
  // @IsDefined()
  region?: string;

  @Field({ nullable: true })
  // @IsDefined()
  geoLocation?: string;

  @Field({ nullable: true })
  // @IsDefined()
  timezone?: string;

  @Field({ nullable: true })
  // @IsDefined()
  personalInfo?: string;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  metaData: any;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  metaDataInternal: any;

  // TODO: can remove person don't use createdByPersonId
  // this is used to pass loggedIn userId to fabric
  // @Field({ nullable: true })
  // @IsOptional()
  // loggedPersonId: string;

  // store future profile and reputation average object
  @Field(type => GraphQLJSONObject, { nullable: true })
  // @IsDefined()
  profile?: any;

  // citizenCard data: copy from personModel and add @IsOptional

  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  firstName?: string;

  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  lastName?: string;

  // M
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  @MaxLength(20)
  gender?: string;

  // 1,81
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  @IsNumber()
  height?: number;

  // Alberto
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  fatherFirstName?: string;

  // De Andrade Monteiro
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  fatherLastName?: string;

  // Maria Da Graça De Oliveira Mendes
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  motherFirstName?: string;

  // Monteiro
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  motherLastName?: string;

  // 19 12 1971
  @Field(type => Date, { nullable: true })
  @IsDefined()
  // @IsDate() don't enable on new-x-input's
  @IsOptional()
  birthDate?: Date;

  // PRT
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  nationality?: string;

  // PRT
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  country?: string;

  // 09879462 0 ZZ3
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  documentNumber?: string;

  // Cartão De Cidadão
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  documentType?: string;

  // 006.007.23
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  cardVersion?: string;

  // 08 05 2018
  @Field(type => Date, { nullable: true })
  @IsDefined()
  // @IsDate() don't enable on new-x-input's
  @IsOptional()
  emissionDate?: Date;

  // 08 05 2028
  @Field(type => Date, { nullable: true })
  @IsDefined()
  // @IsDate() don't enable on new-x-input's
  @IsOptional()
  expirationDate?: Date;

  // República Portuguesa
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  emittingEntity?: string;

  // 098794620
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  identityNumber?: string;

  // 182692124
  @Field()
  @IsDefined()
  fiscalNumber: string;

  // 11103478242
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  socialSecurityNumber?: string;

  // 285191659
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  beneficiaryNumber?: string;

  // 0000036014662658
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  pan?: string;

  // CRCiv. Figueira da Foz
  @Field({ nullable: true })
  @IsDefined()
  @IsOptional()
  requestLocation?: string;

  @Field({ nullable: true })
  @IsOptional()
  otherInformation!: string;
}
