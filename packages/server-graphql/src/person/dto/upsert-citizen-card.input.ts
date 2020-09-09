import { IsDefined, IsNumber, IsOptional, IsUUID, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpsertCitizenCardInput {
  // optional: generated automatically, but can optionally be used
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  id: string;

  @Field()
  @IsDefined()
  firstName?: string;

  @Field()
  @IsDefined()
  lastName?: string;

  // M
  @Field()
  @IsDefined()
  @MaxLength(20)
  gender?: string;

  // 1,81
  @Field()
  @IsDefined()
  @IsNumber()
  height?: number;

  // Alberto
  @Field()
  @IsDefined()
  fatherFirstName?: string;

  // De Andrade Monteiro
  @Field()
  @IsDefined()
  fatherLastName?: string;

  // Maria Da Graça De Oliveira Mendes
  @Field()
  @IsDefined()
  motherFirstName?: string;

  // Monteiro
  @Field()
  @IsDefined()
  motherLastName?: string;

  // 19 12 1971
  @Field(type => Date)
  @IsDefined()
  // @IsDate() don't enable on new-x-input's
  birthDate?: Date;

  // PRT
  @Field()
  @IsDefined()
  nationality?: string;

  // PRT
  @Field()
  @IsDefined()
  country?: string;

  // 09879462 0 ZZ3
  @Field()
  @IsDefined()
  documentNumber?: string;

  // Cartão De Cidadão
  @Field()
  @IsDefined()
  documentType?: string;

  // 006.007.23
  @Field()
  @IsDefined()
  cardVersion?: string;

  // 08 05 2018
  @Field(type => Date)
  @IsDefined()
  // @IsDate() don't enable on new-x-input's
  emissionDate?: Date;

  // 08 05 2028
  @Field(type => Date)
  @IsDefined()
  expirationDate?: Date;

  // República Portuguesa
  @Field()
  @IsDefined()
  emittingEntity?: string;

  // 098794620
  @Field()
  @IsDefined()
  identityNumber?: string;

  // 182692124
  @Field()
  @IsDefined()
  fiscalNumber?: string;

  // 11103478242
  @Field()
  @IsDefined()
  socialSecurityNumber?: string;

  // 285191659
  @Field()
  @IsDefined()
  beneficiaryNumber?: string;

  // 0000036014662658
  @Field()
  @IsDefined()
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
