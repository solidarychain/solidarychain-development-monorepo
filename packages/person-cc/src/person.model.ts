import { appConstants as c, UserRoles } from '@convector-sample/common';
import { Participant } from '@convector-sample/participant-cc';
import { ConvectorModel, Default, FlatConvectorModel, ReadOnly, Required, Validate } from '@worldsibu/convector-core';
import * as yup from 'yup';
import { PersonAttribute } from './person-attribute.model';

export class Person extends ConvectorModel<Person> {
  @ReadOnly()
  @Required()
  public readonly type = c.CONVECTOR_MODEL_PATH_PERSON;

  // non citizenCard data
  
  // @Required()
  @Validate(yup.string()
    .min(4, c.YUP_MESSAGE_USERNAME_TO_SHORT)
    .max(16, c.YUP_MESSAGE_USERNAME_TO_LONG)
  )
  public username: string;

  @Required()
  @Validate(yup.string()
    .min(8, c.YUP_MESSAGE_PASSWORD_TO_SHORT)
    .matches(c.REGEX_PASSWORD, c.YUP_MESSAGE_INVALID_PASSWORD)
  )
  public password: string;

  // @Required()
  @Validate(yup.string()
  .matches(c.REGEX_EMAIL, c.YUP_MESSAGE_INVALID_EMAIL)
  )
  public email: string;

  @Validate(yup.array(PersonAttribute.schema()))
  public attributes: Array<PersonAttribute>;

  @Default([UserRoles.User])
  @Validate(yup.array().of(yup.string()))
  public roles: Array<String>;

  @Required()
  @Validate(Participant.schema())
  public participant: FlatConvectorModel<Participant>;

  // extended data

  @Required()
  @Validate(yup.number())
  public registrationDate: number;

  // citizenCard data

  // Mário Alberto
  @Required()
  @Validate(yup.string())
  public firstname: string;

  // Mendes Monteiro
  @Required()
  @Validate(yup.string())
  public lastname: string;

  // M
  @Required()
  @Validate(yup.string().max(20))
  public gender: string;

  // TODO: convert to 1.81
  // 1,81
  @Required()
  @Validate(yup.string())
  public height: number;

  // Alberto
  @Required()
  @Validate(yup.string())
  public fatherFirstname: string;

  // De Andrade Monteiro
  @Required()
  @Validate(yup.string())
  public fatherLastname: string;

  // Maria Da Graça De Oliveira Mendes
  @Required()
  @Validate(yup.string())
  public motherFirstname: string;

  // Monteiro
  @Required()
  @Validate(yup.string())
  public motherLastname: string;

  // 19 12 1971
  @Required()
  @Validate(yup.number())
  public birthDate: number;

  // PRT
  @Required()
  @Validate(yup.string())
  public nationality: string;

  // PRT
  @Required()
  @Validate(yup.string())
  public country: string;

  // 09879462 0 ZZ3
  @Required()
  @Validate(yup.string())
  public documentNumber: string;

  // Cartão De Cidadão
  @Required()
  @Validate(yup.string())
  public documentType: string;

  // 006.007.23
  @Required()
  @Validate(yup.string())
  public cardVersion: string;

  // 08 05 2018
  @Required()
  @Validate(yup.number())
  public emissionDate: number;

  // 08 05 2028
  @Required()
  @Validate(yup.number())
  public expirationDate: number;

  // República Portuguesa
  @Required()
  @Validate(yup.string())
  public emittingEntity: string;

  // 098794620
  @Required()
  @Validate(yup.string())
  public identityNumber: string;

  // 182692124
  @Required()
  @Validate(yup.string())
  public fiscalNumber: string;

  // 11103478242
  @Required()
  @Validate(yup.string())
  public socialSecurityNumber: string;

  // 285191659
  @Required()
  @Validate(yup.string())
  public beneficiaryNumber: string; 

  // 0000036014662658
  @Required()
  @Validate(yup.string())
  public pan: string;

  // CRCiv. Figueira da Foz
  @Required()
  @Validate(yup.string())
  public requestLocation: string;

  // @Required()
  @Validate(yup.string()/*.nullable()*/)
  public otherInformation: string;
}
