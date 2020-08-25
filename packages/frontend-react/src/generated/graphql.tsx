import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** Date custom scalar type */
  Date: any;
};

export type Query = {
  __typename?: 'Query';
  causes: Array<Cause>;
  causeOngoing: Array<Cause>;
  causeComplexQuery: Array<Cause>;
  causeById: Cause;
  participants: Array<Participant>;
  participantComplexQuery: Array<Participant>;
  participantById: Participant;
  participantByCode: Participant;
  persons: Array<Person>;
  personByAttribute: Array<Person>;
  personComplexQuery: Array<Person>;
  personById: Person;
  personByUsername: Person;
  personByFiscalnumber: Person;
  personProfile: Person;
  transactions: Array<Transaction>;
  transactionComplexQuery: Array<Transaction>;
  transactionById: Transaction;
  assets: Array<Asset>;
  assetComplexQuery: Array<Asset>;
  assetById: Asset;
};


export type QueryCausesArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryCauseOngoingArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  date: Scalars['Float'];
};


export type QueryCauseComplexQueryArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  getByComplexQueryInput: GetByComplexQueryInput;
};


export type QueryCauseByIdArgs = {
  id: Scalars['String'];
};


export type QueryParticipantsArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryParticipantComplexQueryArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  getByComplexQueryInput: GetByComplexQueryInput;
};


export type QueryParticipantByIdArgs = {
  id: Scalars['String'];
};


export type QueryParticipantByCodeArgs = {
  code: Scalars['String'];
};


export type QueryPersonsArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryPersonByAttributeArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  getByAttributeInput: GetByAttributeInput;
};


export type QueryPersonComplexQueryArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  getByComplexQueryInput: GetByComplexQueryInput;
};


export type QueryPersonByIdArgs = {
  id: Scalars['String'];
};


export type QueryPersonByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryPersonByFiscalnumberArgs = {
  fiscalNumber: Scalars['String'];
};


export type QueryTransactionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryTransactionComplexQueryArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  getByComplexQueryInput: GetByComplexQueryInput;
};


export type QueryTransactionByIdArgs = {
  id: Scalars['String'];
};


export type QueryAssetsArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryAssetComplexQueryArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  getByComplexQueryInput: GetByComplexQueryInput;
};


export type QueryAssetByIdArgs = {
  id: Scalars['String'];
};

export type Cause = {
  __typename?: 'Cause';
  id: Scalars['ID'];
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  ambassadors?: Maybe<Array<Scalars['String']>>;
  startDate?: Maybe<Scalars['Float']>;
  endDate?: Maybe<Scalars['Float']>;
  location?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
  input: EntityResult;
  participant: Participant;
  createdDate: Scalars['Float'];
  createdByPersonId?: Maybe<Scalars['String']>;
  fundsBalance: GenericBalance;
  volunteeringHoursBalance: GenericBalance;
  goodsStock?: Maybe<Array<Goods>>;
};


export type EntityResult = {
  __typename?: 'EntityResult';
  entity: Entity;
};

export type Entity = {
  __typename?: 'Entity';
  id: Scalars['ID'];
  type: Scalars['String'];
  createdDate: Scalars['Float'];
};

export type Participant = {
  __typename?: 'Participant';
  id: Scalars['ID'];
  code: Scalars['String'];
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  ambassadors?: Maybe<Array<Scalars['String']>>;
  msp: Scalars['String'];
  participant?: Maybe<Participant>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
  createdDate: Scalars['Float'];
  createdByPersonId?: Maybe<Scalars['String']>;
  fundsBalance: GenericBalance;
  volunteeringHoursBalance: GenericBalance;
  goodsStock?: Maybe<Array<Goods>>;
};

export type GenericBalance = {
  __typename?: 'GenericBalance';
  debit: Scalars['Float'];
  credit: Scalars['Float'];
  balance: Scalars['Float'];
};

export type Goods = {
  __typename?: 'Goods';
  id: Scalars['ID'];
  code: Scalars['String'];
  barCode?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  balance: GenericBalance;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
  createdDate: Scalars['Float'];
  createdByPersonId: Scalars['String'];
};

export type GetByComplexQueryInput = {
  filter: Scalars['JSONObject'];
  fields?: Maybe<Array<Scalars['String']>>;
  sort?: Maybe<Array<Scalars['JSONObject']>>;
};

export type Person = {
  __typename?: 'Person';
  id: Scalars['ID'];
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  attributes?: Maybe<Array<Attribute>>;
  roles?: Maybe<Array<Scalars['String']>>;
  participant: Participant;
  createdDate: Scalars['Float'];
  registrationDate: Scalars['Date'];
  mobilePhone?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  geoLocation?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  personalInfo?: Maybe<Scalars['String']>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
  profile?: Maybe<Scalars['JSONObject']>;
  fundsBalance: GenericBalance;
  volunteeringHoursBalance: GenericBalance;
  goodsStock?: Maybe<Array<Goods>>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Float']>;
  fatherFirstname?: Maybe<Scalars['String']>;
  fatherLastname?: Maybe<Scalars['String']>;
  motherFirstname?: Maybe<Scalars['String']>;
  motherLastname?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['Date']>;
  nationality?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  documentNumber?: Maybe<Scalars['String']>;
  documentType?: Maybe<Scalars['String']>;
  cardVersion?: Maybe<Scalars['String']>;
  emissionDate?: Maybe<Scalars['Date']>;
  expirationDate?: Maybe<Scalars['Date']>;
  emittingEntity?: Maybe<Scalars['String']>;
  identityNumber?: Maybe<Scalars['String']>;
  fiscalNumber: Scalars['String'];
  socialSecurityNumber?: Maybe<Scalars['String']>;
  beneficiaryNumber?: Maybe<Scalars['String']>;
  pan?: Maybe<Scalars['String']>;
  requestLocation?: Maybe<Scalars['String']>;
  otherInformation?: Maybe<Scalars['String']>;
};

export type Attribute = {
  __typename?: 'Attribute';
  id: Scalars['ID'];
  content?: Maybe<Scalars['JSONObject']>;
  issuedDate?: Maybe<Scalars['Float']>;
  expiresDate?: Maybe<Scalars['Date']>;
  expired?: Maybe<Scalars['Boolean']>;
  certifierID?: Maybe<Scalars['String']>;
};


export type GetByAttributeInput = {
  id: Scalars['String'];
  content?: Maybe<Scalars['JSONObject']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  id: Scalars['ID'];
  transactionType: Scalars['String'];
  resourceType: Scalars['String'];
  input: EntityResult;
  output: EntityResult;
  quantity?: Maybe<Scalars['Float']>;
  currency?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
  participant?: Maybe<Participant>;
  createdDate: Scalars['Float'];
  createdByPersonId?: Maybe<Scalars['String']>;
  assetId?: Maybe<Scalars['String']>;
  goods?: Maybe<Array<Goods>>;
};

export type Asset = {
  __typename?: 'Asset';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  assetType: Scalars['String'];
  ambassadors?: Maybe<Array<Scalars['String']>>;
  owner: EntityResult;
  location?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
  participant: Participant;
  createdDate: Scalars['Float'];
  createdByPersonId?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  personLogin: PersonLoginResponse;
  personLogout: Scalars['Boolean'];
  revokeUserRefreshTokens: Scalars['Boolean'];
  causeNew: Cause;
  causeUpdate: Cause;
  participantNew: Participant;
  participantUpdate: Participant;
  participantChangeIdentity: Participant;
  personRegister: Person;
  personAddAttribute: Person;
  personUpdate: Person;
  personUpdatePassword: Person;
  personUpdateProfile: Person;
  personUpsertCitizenCard: Person;
  transactionNew: Transaction;
  transactionUpdate: Transaction;
  assetNew: Asset;
  assetUpdate: Asset;
};


export type MutationPersonLoginArgs = {
  loginPersonData: LoginPersonInput;
};


export type MutationRevokeUserRefreshTokensArgs = {
  username: Scalars['String'];
};


export type MutationCauseNewArgs = {
  newCauseData: NewCauseInput;
};


export type MutationCauseUpdateArgs = {
  updateCauseData: UpdateCauseInput;
};


export type MutationParticipantNewArgs = {
  newParticipantData: NewParticipantInput;
};


export type MutationParticipantUpdateArgs = {
  updateParticipantData: UpdateParticipantInput;
};


export type MutationParticipantChangeIdentityArgs = {
  changeParticipantIdentityData: ChangeParticipantIdentityData;
};


export type MutationPersonRegisterArgs = {
  newPersonData: NewPersonInput;
};


export type MutationPersonAddAttributeArgs = {
  addPersonAttributeData: AddPersonAttributeInput;
  personId: Scalars['String'];
};


export type MutationPersonUpdateArgs = {
  updatePersonData: UpdatePersonInput;
};


export type MutationPersonUpdatePasswordArgs = {
  updatePersonPasswordData: UpdatePersonPasswordInput;
};


export type MutationPersonUpdateProfileArgs = {
  updatePersonProfileData: UpdatePersonProfileInput;
};


export type MutationPersonUpsertCitizenCardArgs = {
  upsertCitizenCardData: UpsertCitizenCardInput;
};


export type MutationTransactionNewArgs = {
  newTransactionData: NewTransactionInput;
};


export type MutationTransactionUpdateArgs = {
  updateTransactionData: UpdateTransactionInput;
};


export type MutationAssetNewArgs = {
  newAssetData: NewAssetInput;
};


export type MutationAssetUpdateArgs = {
  updateAssetData: UpdateAssetInput;
};

export type LoginPersonInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type PersonLoginResponse = {
  __typename?: 'PersonLoginResponse';
  user: Person;
  accessToken: Scalars['String'];
};

export type NewCauseInput = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  ambassadors?: Maybe<Array<Scalars['String']>>;
  startDate?: Maybe<Scalars['Date']>;
  endDate?: Maybe<Scalars['Date']>;
  location?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
  loggedPersonId?: Maybe<Scalars['String']>;
  input: Scalars['JSONObject'];
};

export type UpdateCauseInput = {
  id: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  ambassadors?: Maybe<Array<Scalars['String']>>;
  tags?: Maybe<Array<Scalars['String']>>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
};

export type NewParticipantInput = {
  id?: Maybe<Scalars['String']>;
  code: Scalars['String'];
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  ambassadors?: Maybe<Array<Scalars['String']>>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
  loggedPersonId?: Maybe<Scalars['String']>;
};

export type UpdateParticipantInput = {
  id: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  ambassadors?: Maybe<Array<Scalars['String']>>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
};

export type ChangeParticipantIdentityData = {
  id: Scalars['String'];
  newIdentity: Scalars['String'];
};

export type NewPersonInput = {
  id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  mobilePhone?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  geoLocation?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  personalInfo?: Maybe<Scalars['String']>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
  profile?: Maybe<Scalars['JSONObject']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Float']>;
  fatherFirstname?: Maybe<Scalars['String']>;
  fatherLastname?: Maybe<Scalars['String']>;
  motherFirstname?: Maybe<Scalars['String']>;
  motherLastname?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['Date']>;
  nationality?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  documentNumber?: Maybe<Scalars['String']>;
  documentType?: Maybe<Scalars['String']>;
  cardVersion?: Maybe<Scalars['String']>;
  emissionDate?: Maybe<Scalars['Date']>;
  expirationDate?: Maybe<Scalars['Date']>;
  emittingEntity?: Maybe<Scalars['String']>;
  identityNumber?: Maybe<Scalars['String']>;
  fiscalNumber: Scalars['String'];
  socialSecurityNumber?: Maybe<Scalars['String']>;
  beneficiaryNumber?: Maybe<Scalars['String']>;
  pan?: Maybe<Scalars['String']>;
  requestLocation?: Maybe<Scalars['String']>;
  otherInformation?: Maybe<Scalars['String']>;
};

export type AddPersonAttributeInput = {
  id: Scalars['ID'];
  content?: Maybe<Scalars['JSONObject']>;
  issuedDate?: Maybe<Scalars['Float']>;
  expiresDate?: Maybe<Scalars['Date']>;
  expired?: Maybe<Scalars['Boolean']>;
  certifierID?: Maybe<Scalars['String']>;
};

export type UpdatePersonInput = {
  id: Scalars['String'];
  roles?: Maybe<Array<Scalars['String']>>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
};

export type UpdatePersonPasswordInput = {
  id: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};

export type UpdatePersonProfileInput = {
  id: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  mobilePhone?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  geoLocation?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  personalInfo?: Maybe<Scalars['String']>;
  metaData?: Maybe<Scalars['JSONObject']>;
};

export type UpsertCitizenCardInput = {
  id?: Maybe<Scalars['String']>;
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  gender: Scalars['String'];
  height: Scalars['Float'];
  fatherFirstname: Scalars['String'];
  fatherLastname: Scalars['String'];
  motherFirstname: Scalars['String'];
  motherLastname: Scalars['String'];
  birthDate: Scalars['Date'];
  nationality: Scalars['String'];
  country: Scalars['String'];
  documentNumber: Scalars['String'];
  documentType: Scalars['String'];
  cardVersion: Scalars['String'];
  emissionDate: Scalars['Date'];
  expirationDate: Scalars['Date'];
  emittingEntity: Scalars['String'];
  identityNumber: Scalars['String'];
  fiscalNumber: Scalars['String'];
  socialSecurityNumber: Scalars['String'];
  beneficiaryNumber: Scalars['String'];
  pan: Scalars['String'];
  requestLocation?: Maybe<Scalars['String']>;
  otherInformation?: Maybe<Scalars['String']>;
};

export type NewTransactionInput = {
  id?: Maybe<Scalars['String']>;
  transactionType: Scalars['String'];
  resourceType: Scalars['String'];
  input: Scalars['JSONObject'];
  output: Scalars['JSONObject'];
  quantity?: Maybe<Scalars['Float']>;
  currency?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
  loggedPersonId?: Maybe<Scalars['String']>;
  assetId?: Maybe<Scalars['String']>;
  goods?: Maybe<Array<GoodsInput>>;
};

export type GoodsInput = {
  id?: Maybe<Scalars['ID']>;
  code: Scalars['String'];
  barCode?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  quantity: Scalars['Float'];
  tags?: Maybe<Array<Scalars['String']>>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
};

export type UpdateTransactionInput = {
  id: Scalars['String'];
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
};

export type NewAssetInput = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  assetType: Scalars['String'];
  ambassadors?: Maybe<Array<Scalars['String']>>;
  owner: Scalars['JSONObject'];
  location?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
  loggedPersonId?: Maybe<Scalars['String']>;
};

export type UpdateAssetInput = {
  id: Scalars['String'];
  ambassadors?: Maybe<Array<Scalars['String']>>;
  tags?: Maybe<Array<Scalars['String']>>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  personLogged: Scalars['String'];
  causeAdded: Cause;
  causeUpdated: Cause;
  participantAdded: Participant;
  participantUpdated: Participant;
  participantIdentityChanged: Participant;
  personAdded: Person;
  personAttributeAdded: Person;
  personUpdated: Person;
  personPasswordUpdated: Person;
  personProfileUpdated: Person;
  personCitizenCardUpserted: Person;
  transactionAdded: Transaction;
  transactionUpdated: Transaction;
  assetAdded: Asset;
  assetUpdated: Asset;
};

export type AccessToken = {
  __typename?: 'AccessToken';
  accessToken: Scalars['String'];
};

export type X509Identities = {
  __typename?: 'x509Identities';
  id?: Maybe<Scalars['ID']>;
  status: Scalars['Boolean'];
  fingerprint: Scalars['String'];
};

export type NewParticipantDataMutationVariables = Exact<{
  newParticipantData: NewParticipantInput;
}>;


export type NewParticipantDataMutation = (
  { __typename?: 'Mutation' }
  & { participantNew: (
    { __typename?: 'Participant' }
    & Pick<Participant, 'id' | 'name' | 'msp'>
  ) }
);

export type ParticipantNewMutationVariables = Exact<{
  newParticipantData: NewParticipantInput;
}>;


export type ParticipantNewMutation = (
  { __typename?: 'Mutation' }
  & { participantNew: (
    { __typename?: 'Participant' }
    & Pick<Participant, 'id' | 'name' | 'msp'>
  ) }
);

export type PersonAddAttributeMutationVariables = Exact<{
  personId: Scalars['String'];
  addPersonAttributeData: AddPersonAttributeInput;
}>;


export type PersonAddAttributeMutation = (
  { __typename?: 'Mutation' }
  & { personAddAttribute: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'username' | 'email' | 'roles' | 'mobilePhone' | 'postal' | 'city' | 'region' | 'geoLocation' | 'timezone' | 'personalInfo' | 'profile' | 'firstname' | 'lastname' | 'gender' | 'height' | 'fatherFirstname' | 'fatherLastname' | 'motherFirstname' | 'motherLastname' | 'birthDate' | 'nationality' | 'country' | 'documentNumber' | 'documentType' | 'cardVersion' | 'emissionDate' | 'expirationDate' | 'emittingEntity' | 'identityNumber' | 'fiscalNumber' | 'socialSecurityNumber' | 'beneficiaryNumber' | 'pan' | 'requestLocation' | 'otherInformation' | 'registrationDate'>
    & { attributes?: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    ) }
  ) }
);

export type PersonLoginMutationVariables = Exact<{
  loginPersonData: LoginPersonInput;
}>;


export type PersonLoginMutation = (
  { __typename?: 'Mutation' }
  & { personLogin: (
    { __typename?: 'PersonLoginResponse' }
    & Pick<PersonLoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'Person' }
      & Pick<Person, 'id' | 'username' | 'email' | 'roles' | 'mobilePhone' | 'postal' | 'city' | 'region' | 'geoLocation' | 'timezone' | 'personalInfo' | 'profile' | 'firstname' | 'lastname' | 'gender' | 'height' | 'fatherFirstname' | 'fatherLastname' | 'motherFirstname' | 'motherLastname' | 'birthDate' | 'nationality' | 'country' | 'documentNumber' | 'documentType' | 'cardVersion' | 'emissionDate' | 'expirationDate' | 'emittingEntity' | 'identityNumber' | 'fiscalNumber' | 'socialSecurityNumber' | 'beneficiaryNumber' | 'pan' | 'requestLocation' | 'otherInformation' | 'registrationDate'>
      & { attributes?: Maybe<Array<(
        { __typename?: 'Attribute' }
        & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
      )>>, participant: (
        { __typename?: 'Participant' }
        & Pick<Participant, 'id' | 'name' | 'msp'>
      ) }
    ) }
  ) }
);

export type PersonLogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type PersonLogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'personLogout'>
);

export type PersonRegisterMutationVariables = Exact<{
  newPersonData: NewPersonInput;
}>;


export type PersonRegisterMutation = (
  { __typename?: 'Mutation' }
  & { personRegister: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'firstname' | 'lastname' | 'username' | 'email' | 'roles'>
    & { attributes?: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    ) }
  ) }
);

export type CausesQueryVariables = Exact<{
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type CausesQuery = (
  { __typename?: 'Query' }
  & { causes: Array<(
    { __typename?: 'Cause' }
    & Pick<Cause, 'id' | 'name' | 'startDate' | 'endDate' | 'location' | 'tags' | 'metaData' | 'createdDate'>
    & { input: (
      { __typename?: 'EntityResult' }
      & { entity: (
        { __typename?: 'Entity' }
        & Pick<Entity, 'id'>
      ) }
    ) }
  )> }
);

export type ParticipantByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ParticipantByIdQuery = (
  { __typename?: 'Query' }
  & { participantById: (
    { __typename?: 'Participant' }
    & Pick<Participant, 'id' | 'name' | 'msp' | 'createdDate'>
    & { participant?: Maybe<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    )> }
  ) }
);

export type ParticipantsQueryVariables = Exact<{
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type ParticipantsQuery = (
  { __typename?: 'Query' }
  & { participants: Array<(
    { __typename?: 'Participant' }
    & Pick<Participant, 'id' | 'name' | 'msp' | 'createdDate'>
    & { participant?: Maybe<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    )> }
  )> }
);

export type PersonByAttributeQueryVariables = Exact<{
  getByAttributeInput: GetByAttributeInput;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type PersonByAttributeQuery = (
  { __typename?: 'Query' }
  & { personByAttribute: Array<(
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'username' | 'email' | 'roles' | 'mobilePhone' | 'postal' | 'city' | 'region' | 'geoLocation' | 'timezone' | 'personalInfo' | 'profile' | 'firstname' | 'lastname' | 'gender' | 'height' | 'fatherFirstname' | 'fatherLastname' | 'motherFirstname' | 'motherLastname' | 'birthDate' | 'nationality' | 'country' | 'documentNumber' | 'documentType' | 'cardVersion' | 'emissionDate' | 'expirationDate' | 'emittingEntity' | 'identityNumber' | 'fiscalNumber' | 'socialSecurityNumber' | 'beneficiaryNumber' | 'pan' | 'requestLocation' | 'otherInformation' | 'registrationDate' | 'createdDate'>
    & { attributes?: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    ) }
  )> }
);

export type PersonByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PersonByIdQuery = (
  { __typename?: 'Query' }
  & { personById: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'username' | 'email' | 'roles' | 'mobilePhone' | 'postal' | 'city' | 'region' | 'geoLocation' | 'timezone' | 'personalInfo' | 'profile' | 'firstname' | 'lastname' | 'gender' | 'height' | 'fatherFirstname' | 'fatherLastname' | 'motherFirstname' | 'motherLastname' | 'birthDate' | 'nationality' | 'country' | 'documentNumber' | 'documentType' | 'cardVersion' | 'emissionDate' | 'expirationDate' | 'emittingEntity' | 'identityNumber' | 'fiscalNumber' | 'socialSecurityNumber' | 'beneficiaryNumber' | 'pan' | 'requestLocation' | 'otherInformation' | 'registrationDate' | 'createdDate'>
    & { attributes?: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    ) }
  ) }
);

export type PersonByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type PersonByUsernameQuery = (
  { __typename?: 'Query' }
  & { personByUsername: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'firstname' | 'lastname' | 'username' | 'email' | 'roles' | 'createdDate'>
    & { attributes?: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    ) }
  ) }
);

export type PersonProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type PersonProfileQuery = (
  { __typename?: 'Query' }
  & { personProfile: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'username' | 'email' | 'roles' | 'mobilePhone' | 'postal' | 'city' | 'region' | 'geoLocation' | 'timezone' | 'personalInfo' | 'profile' | 'firstname' | 'lastname' | 'gender' | 'height' | 'fatherFirstname' | 'fatherLastname' | 'motherFirstname' | 'motherLastname' | 'birthDate' | 'nationality' | 'country' | 'documentNumber' | 'documentType' | 'cardVersion' | 'emissionDate' | 'expirationDate' | 'emittingEntity' | 'identityNumber' | 'fiscalNumber' | 'socialSecurityNumber' | 'beneficiaryNumber' | 'pan' | 'requestLocation' | 'otherInformation' | 'registrationDate' | 'createdDate'>
    & { attributes?: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    ) }
  ) }
);

export type PersonsQueryVariables = Exact<{
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type PersonsQuery = (
  { __typename?: 'Query' }
  & { persons: Array<(
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'username' | 'email' | 'roles' | 'mobilePhone' | 'postal' | 'city' | 'region' | 'geoLocation' | 'timezone' | 'personalInfo' | 'profile' | 'firstname' | 'lastname' | 'gender' | 'height' | 'fatherFirstname' | 'fatherLastname' | 'motherFirstname' | 'motherLastname' | 'birthDate' | 'nationality' | 'country' | 'documentNumber' | 'documentType' | 'cardVersion' | 'emissionDate' | 'expirationDate' | 'emittingEntity' | 'identityNumber' | 'fiscalNumber' | 'socialSecurityNumber' | 'beneficiaryNumber' | 'pan' | 'requestLocation' | 'otherInformation' | 'registrationDate' | 'createdDate'>
    & { attributes?: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'code' | 'email' | 'name' | 'msp' | 'createdDate'>
      & { fundsBalance: (
        { __typename?: 'GenericBalance' }
        & Pick<GenericBalance, 'debit' | 'credit' | 'balance'>
      ), volunteeringHoursBalance: (
        { __typename?: 'GenericBalance' }
        & Pick<GenericBalance, 'debit' | 'credit' | 'balance'>
      ) }
    ), fundsBalance: (
      { __typename?: 'GenericBalance' }
      & Pick<GenericBalance, 'debit' | 'credit' | 'balance'>
    ), volunteeringHoursBalance: (
      { __typename?: 'GenericBalance' }
      & Pick<GenericBalance, 'debit' | 'credit' | 'balance'>
    ), goodsStock?: Maybe<Array<(
      { __typename?: 'Goods' }
      & Pick<Goods, 'id' | 'code' | 'barCode' | 'name' | 'description' | 'tags' | 'metaData' | 'metaDataInternal' | 'createdDate' | 'createdByPersonId'>
      & { balance: (
        { __typename?: 'GenericBalance' }
        & Pick<GenericBalance, 'debit' | 'credit' | 'balance'>
      ) }
    )>> }
  )> }
);

export type ParticipantAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ParticipantAddedSubscription = (
  { __typename?: 'Subscription' }
  & { participantAdded: (
    { __typename?: 'Participant' }
    & Pick<Participant, 'id' | 'name' | 'msp'>
  ) }
);

export type PersonAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PersonAddedSubscription = (
  { __typename?: 'Subscription' }
  & { personAdded: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'firstname' | 'lastname' | 'username' | 'email' | 'roles'>
    & { attributes?: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    ) }
  ) }
);

export type PersonLoggedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PersonLoggedSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'personLogged'>
);


export const NewParticipantDataDocument = gql`
    mutation newParticipantData($newParticipantData: NewParticipantInput!) {
  participantNew(newParticipantData: $newParticipantData) {
    id
    name
    msp
  }
}
    `;
export type NewParticipantDataMutationFn = Apollo.MutationFunction<NewParticipantDataMutation, NewParticipantDataMutationVariables>;

/**
 * __useNewParticipantDataMutation__
 *
 * To run a mutation, you first call `useNewParticipantDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewParticipantDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newParticipantDataMutation, { data, loading, error }] = useNewParticipantDataMutation({
 *   variables: {
 *      newParticipantData: // value for 'newParticipantData'
 *   },
 * });
 */
export function useNewParticipantDataMutation(baseOptions?: Apollo.MutationHookOptions<NewParticipantDataMutation, NewParticipantDataMutationVariables>) {
        return Apollo.useMutation<NewParticipantDataMutation, NewParticipantDataMutationVariables>(NewParticipantDataDocument, baseOptions);
      }
export type NewParticipantDataMutationHookResult = ReturnType<typeof useNewParticipantDataMutation>;
export type NewParticipantDataMutationResult = Apollo.MutationResult<NewParticipantDataMutation>;
export type NewParticipantDataMutationOptions = Apollo.BaseMutationOptions<NewParticipantDataMutation, NewParticipantDataMutationVariables>;
export const ParticipantNewDocument = gql`
    mutation participantNew($newParticipantData: NewParticipantInput!) {
  participantNew(newParticipantData: $newParticipantData) {
    id
    name
    msp
  }
}
    `;
export type ParticipantNewMutationFn = Apollo.MutationFunction<ParticipantNewMutation, ParticipantNewMutationVariables>;

/**
 * __useParticipantNewMutation__
 *
 * To run a mutation, you first call `useParticipantNewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useParticipantNewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [participantNewMutation, { data, loading, error }] = useParticipantNewMutation({
 *   variables: {
 *      newParticipantData: // value for 'newParticipantData'
 *   },
 * });
 */
export function useParticipantNewMutation(baseOptions?: Apollo.MutationHookOptions<ParticipantNewMutation, ParticipantNewMutationVariables>) {
        return Apollo.useMutation<ParticipantNewMutation, ParticipantNewMutationVariables>(ParticipantNewDocument, baseOptions);
      }
export type ParticipantNewMutationHookResult = ReturnType<typeof useParticipantNewMutation>;
export type ParticipantNewMutationResult = Apollo.MutationResult<ParticipantNewMutation>;
export type ParticipantNewMutationOptions = Apollo.BaseMutationOptions<ParticipantNewMutation, ParticipantNewMutationVariables>;
export const PersonAddAttributeDocument = gql`
    mutation personAddAttribute($personId: String!, $addPersonAttributeData: AddPersonAttributeInput!) {
  personAddAttribute(personId: $personId, addPersonAttributeData: $addPersonAttributeData) {
    id
    username
    email
    attributes {
      id
      content
      issuedDate
      expiresDate
      expired
      certifierID
    }
    roles
    participant {
      id
      name
      msp
    }
    mobilePhone
    postal
    city
    region
    geoLocation
    timezone
    personalInfo
    profile
    firstname
    lastname
    gender
    height
    fatherFirstname
    fatherLastname
    motherFirstname
    motherLastname
    birthDate
    nationality
    country
    documentNumber
    documentType
    cardVersion
    emissionDate
    expirationDate
    emittingEntity
    identityNumber
    fiscalNumber
    socialSecurityNumber
    beneficiaryNumber
    pan
    requestLocation
    otherInformation
    registrationDate
  }
}
    `;
export type PersonAddAttributeMutationFn = Apollo.MutationFunction<PersonAddAttributeMutation, PersonAddAttributeMutationVariables>;

/**
 * __usePersonAddAttributeMutation__
 *
 * To run a mutation, you first call `usePersonAddAttributeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePersonAddAttributeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [personAddAttributeMutation, { data, loading, error }] = usePersonAddAttributeMutation({
 *   variables: {
 *      personId: // value for 'personId'
 *      addPersonAttributeData: // value for 'addPersonAttributeData'
 *   },
 * });
 */
export function usePersonAddAttributeMutation(baseOptions?: Apollo.MutationHookOptions<PersonAddAttributeMutation, PersonAddAttributeMutationVariables>) {
        return Apollo.useMutation<PersonAddAttributeMutation, PersonAddAttributeMutationVariables>(PersonAddAttributeDocument, baseOptions);
      }
export type PersonAddAttributeMutationHookResult = ReturnType<typeof usePersonAddAttributeMutation>;
export type PersonAddAttributeMutationResult = Apollo.MutationResult<PersonAddAttributeMutation>;
export type PersonAddAttributeMutationOptions = Apollo.BaseMutationOptions<PersonAddAttributeMutation, PersonAddAttributeMutationVariables>;
export const PersonLoginDocument = gql`
    mutation personLogin($loginPersonData: LoginPersonInput!) {
  personLogin(loginPersonData: $loginPersonData) {
    accessToken
    user {
      id
      username
      email
      attributes {
        id
        content
        issuedDate
        expiresDate
        expired
        certifierID
      }
      roles
      participant {
        id
        name
        msp
      }
      mobilePhone
      postal
      city
      region
      geoLocation
      timezone
      personalInfo
      profile
      firstname
      lastname
      gender
      height
      fatherFirstname
      fatherLastname
      motherFirstname
      motherLastname
      birthDate
      nationality
      country
      documentNumber
      documentType
      cardVersion
      emissionDate
      expirationDate
      emittingEntity
      identityNumber
      fiscalNumber
      socialSecurityNumber
      beneficiaryNumber
      pan
      requestLocation
      otherInformation
      registrationDate
    }
  }
}
    `;
export type PersonLoginMutationFn = Apollo.MutationFunction<PersonLoginMutation, PersonLoginMutationVariables>;

/**
 * __usePersonLoginMutation__
 *
 * To run a mutation, you first call `usePersonLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePersonLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [personLoginMutation, { data, loading, error }] = usePersonLoginMutation({
 *   variables: {
 *      loginPersonData: // value for 'loginPersonData'
 *   },
 * });
 */
export function usePersonLoginMutation(baseOptions?: Apollo.MutationHookOptions<PersonLoginMutation, PersonLoginMutationVariables>) {
        return Apollo.useMutation<PersonLoginMutation, PersonLoginMutationVariables>(PersonLoginDocument, baseOptions);
      }
export type PersonLoginMutationHookResult = ReturnType<typeof usePersonLoginMutation>;
export type PersonLoginMutationResult = Apollo.MutationResult<PersonLoginMutation>;
export type PersonLoginMutationOptions = Apollo.BaseMutationOptions<PersonLoginMutation, PersonLoginMutationVariables>;
export const PersonLogoutDocument = gql`
    mutation personLogout {
  personLogout
}
    `;
export type PersonLogoutMutationFn = Apollo.MutationFunction<PersonLogoutMutation, PersonLogoutMutationVariables>;

/**
 * __usePersonLogoutMutation__
 *
 * To run a mutation, you first call `usePersonLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePersonLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [personLogoutMutation, { data, loading, error }] = usePersonLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function usePersonLogoutMutation(baseOptions?: Apollo.MutationHookOptions<PersonLogoutMutation, PersonLogoutMutationVariables>) {
        return Apollo.useMutation<PersonLogoutMutation, PersonLogoutMutationVariables>(PersonLogoutDocument, baseOptions);
      }
export type PersonLogoutMutationHookResult = ReturnType<typeof usePersonLogoutMutation>;
export type PersonLogoutMutationResult = Apollo.MutationResult<PersonLogoutMutation>;
export type PersonLogoutMutationOptions = Apollo.BaseMutationOptions<PersonLogoutMutation, PersonLogoutMutationVariables>;
export const PersonRegisterDocument = gql`
    mutation personRegister($newPersonData: NewPersonInput!) {
  personRegister(newPersonData: $newPersonData) {
    id
    firstname
    lastname
    username
    email
    attributes {
      id
      content
      issuedDate
      expiresDate
      expired
      certifierID
    }
    roles
    participant {
      id
      name
      msp
    }
  }
}
    `;
export type PersonRegisterMutationFn = Apollo.MutationFunction<PersonRegisterMutation, PersonRegisterMutationVariables>;

/**
 * __usePersonRegisterMutation__
 *
 * To run a mutation, you first call `usePersonRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePersonRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [personRegisterMutation, { data, loading, error }] = usePersonRegisterMutation({
 *   variables: {
 *      newPersonData: // value for 'newPersonData'
 *   },
 * });
 */
export function usePersonRegisterMutation(baseOptions?: Apollo.MutationHookOptions<PersonRegisterMutation, PersonRegisterMutationVariables>) {
        return Apollo.useMutation<PersonRegisterMutation, PersonRegisterMutationVariables>(PersonRegisterDocument, baseOptions);
      }
export type PersonRegisterMutationHookResult = ReturnType<typeof usePersonRegisterMutation>;
export type PersonRegisterMutationResult = Apollo.MutationResult<PersonRegisterMutation>;
export type PersonRegisterMutationOptions = Apollo.BaseMutationOptions<PersonRegisterMutation, PersonRegisterMutationVariables>;
export const CausesDocument = gql`
    query causes($skip: Int, $take: Int) {
  causes(skip: $skip, take: $take) {
    id
    name
    startDate
    endDate
    location
    tags
    metaData
    input {
      entity {
        id
      }
    }
    createdDate
  }
}
    `;

/**
 * __useCausesQuery__
 *
 * To run a query within a React component, call `useCausesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCausesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCausesQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useCausesQuery(baseOptions?: Apollo.QueryHookOptions<CausesQuery, CausesQueryVariables>) {
        return Apollo.useQuery<CausesQuery, CausesQueryVariables>(CausesDocument, baseOptions);
      }
export function useCausesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CausesQuery, CausesQueryVariables>) {
          return Apollo.useLazyQuery<CausesQuery, CausesQueryVariables>(CausesDocument, baseOptions);
        }
export type CausesQueryHookResult = ReturnType<typeof useCausesQuery>;
export type CausesLazyQueryHookResult = ReturnType<typeof useCausesLazyQuery>;
export type CausesQueryResult = Apollo.QueryResult<CausesQuery, CausesQueryVariables>;
export const ParticipantByIdDocument = gql`
    query participantById($id: String!) {
  participantById(id: $id) {
    id
    name
    msp
    participant {
      id
      name
      msp
    }
    createdDate
  }
}
    `;

/**
 * __useParticipantByIdQuery__
 *
 * To run a query within a React component, call `useParticipantByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useParticipantByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParticipantByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useParticipantByIdQuery(baseOptions?: Apollo.QueryHookOptions<ParticipantByIdQuery, ParticipantByIdQueryVariables>) {
        return Apollo.useQuery<ParticipantByIdQuery, ParticipantByIdQueryVariables>(ParticipantByIdDocument, baseOptions);
      }
export function useParticipantByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ParticipantByIdQuery, ParticipantByIdQueryVariables>) {
          return Apollo.useLazyQuery<ParticipantByIdQuery, ParticipantByIdQueryVariables>(ParticipantByIdDocument, baseOptions);
        }
export type ParticipantByIdQueryHookResult = ReturnType<typeof useParticipantByIdQuery>;
export type ParticipantByIdLazyQueryHookResult = ReturnType<typeof useParticipantByIdLazyQuery>;
export type ParticipantByIdQueryResult = Apollo.QueryResult<ParticipantByIdQuery, ParticipantByIdQueryVariables>;
export const ParticipantsDocument = gql`
    query participants($skip: Int, $take: Int) {
  participants(skip: $skip, take: $take) {
    id
    name
    msp
    participant {
      id
      name
      msp
    }
    createdDate
  }
}
    `;

/**
 * __useParticipantsQuery__
 *
 * To run a query within a React component, call `useParticipantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useParticipantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParticipantsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useParticipantsQuery(baseOptions?: Apollo.QueryHookOptions<ParticipantsQuery, ParticipantsQueryVariables>) {
        return Apollo.useQuery<ParticipantsQuery, ParticipantsQueryVariables>(ParticipantsDocument, baseOptions);
      }
export function useParticipantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ParticipantsQuery, ParticipantsQueryVariables>) {
          return Apollo.useLazyQuery<ParticipantsQuery, ParticipantsQueryVariables>(ParticipantsDocument, baseOptions);
        }
export type ParticipantsQueryHookResult = ReturnType<typeof useParticipantsQuery>;
export type ParticipantsLazyQueryHookResult = ReturnType<typeof useParticipantsLazyQuery>;
export type ParticipantsQueryResult = Apollo.QueryResult<ParticipantsQuery, ParticipantsQueryVariables>;
export const PersonByAttributeDocument = gql`
    query personByAttribute($getByAttributeInput: GetByAttributeInput!, $skip: Int, $take: Int) {
  personByAttribute(getByAttributeInput: $getByAttributeInput, skip: $skip, take: $take) {
    id
    username
    email
    attributes {
      id
      content
      issuedDate
      expiresDate
      expired
      certifierID
    }
    roles
    participant {
      id
      name
      msp
    }
    mobilePhone
    postal
    city
    region
    geoLocation
    timezone
    personalInfo
    profile
    firstname
    lastname
    gender
    height
    fatherFirstname
    fatherLastname
    motherFirstname
    motherLastname
    birthDate
    nationality
    country
    documentNumber
    documentType
    cardVersion
    emissionDate
    expirationDate
    emittingEntity
    identityNumber
    fiscalNumber
    socialSecurityNumber
    beneficiaryNumber
    pan
    requestLocation
    otherInformation
    registrationDate
    createdDate
  }
}
    `;

/**
 * __usePersonByAttributeQuery__
 *
 * To run a query within a React component, call `usePersonByAttributeQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonByAttributeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonByAttributeQuery({
 *   variables: {
 *      getByAttributeInput: // value for 'getByAttributeInput'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function usePersonByAttributeQuery(baseOptions?: Apollo.QueryHookOptions<PersonByAttributeQuery, PersonByAttributeQueryVariables>) {
        return Apollo.useQuery<PersonByAttributeQuery, PersonByAttributeQueryVariables>(PersonByAttributeDocument, baseOptions);
      }
export function usePersonByAttributeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonByAttributeQuery, PersonByAttributeQueryVariables>) {
          return Apollo.useLazyQuery<PersonByAttributeQuery, PersonByAttributeQueryVariables>(PersonByAttributeDocument, baseOptions);
        }
export type PersonByAttributeQueryHookResult = ReturnType<typeof usePersonByAttributeQuery>;
export type PersonByAttributeLazyQueryHookResult = ReturnType<typeof usePersonByAttributeLazyQuery>;
export type PersonByAttributeQueryResult = Apollo.QueryResult<PersonByAttributeQuery, PersonByAttributeQueryVariables>;
export const PersonByIdDocument = gql`
    query personById($id: String!) {
  personById(id: $id) {
    id
    username
    email
    attributes {
      id
      content
      issuedDate
      expiresDate
      expired
      certifierID
    }
    roles
    participant {
      id
      name
      msp
    }
    mobilePhone
    postal
    city
    region
    geoLocation
    timezone
    personalInfo
    profile
    firstname
    lastname
    gender
    height
    fatherFirstname
    fatherLastname
    motherFirstname
    motherLastname
    birthDate
    nationality
    country
    documentNumber
    documentType
    cardVersion
    emissionDate
    expirationDate
    emittingEntity
    identityNumber
    fiscalNumber
    socialSecurityNumber
    beneficiaryNumber
    pan
    requestLocation
    otherInformation
    registrationDate
    createdDate
  }
}
    `;

/**
 * __usePersonByIdQuery__
 *
 * To run a query within a React component, call `usePersonByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePersonByIdQuery(baseOptions?: Apollo.QueryHookOptions<PersonByIdQuery, PersonByIdQueryVariables>) {
        return Apollo.useQuery<PersonByIdQuery, PersonByIdQueryVariables>(PersonByIdDocument, baseOptions);
      }
export function usePersonByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonByIdQuery, PersonByIdQueryVariables>) {
          return Apollo.useLazyQuery<PersonByIdQuery, PersonByIdQueryVariables>(PersonByIdDocument, baseOptions);
        }
export type PersonByIdQueryHookResult = ReturnType<typeof usePersonByIdQuery>;
export type PersonByIdLazyQueryHookResult = ReturnType<typeof usePersonByIdLazyQuery>;
export type PersonByIdQueryResult = Apollo.QueryResult<PersonByIdQuery, PersonByIdQueryVariables>;
export const PersonByUsernameDocument = gql`
    query personByUsername($username: String!) {
  personByUsername(username: $username) {
    id
    firstname
    lastname
    username
    email
    attributes {
      id
      content
      issuedDate
      expiresDate
      expired
      certifierID
    }
    roles
    participant {
      id
      name
      msp
    }
    createdDate
  }
}
    `;

/**
 * __usePersonByUsernameQuery__
 *
 * To run a query within a React component, call `usePersonByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonByUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function usePersonByUsernameQuery(baseOptions?: Apollo.QueryHookOptions<PersonByUsernameQuery, PersonByUsernameQueryVariables>) {
        return Apollo.useQuery<PersonByUsernameQuery, PersonByUsernameQueryVariables>(PersonByUsernameDocument, baseOptions);
      }
export function usePersonByUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonByUsernameQuery, PersonByUsernameQueryVariables>) {
          return Apollo.useLazyQuery<PersonByUsernameQuery, PersonByUsernameQueryVariables>(PersonByUsernameDocument, baseOptions);
        }
export type PersonByUsernameQueryHookResult = ReturnType<typeof usePersonByUsernameQuery>;
export type PersonByUsernameLazyQueryHookResult = ReturnType<typeof usePersonByUsernameLazyQuery>;
export type PersonByUsernameQueryResult = Apollo.QueryResult<PersonByUsernameQuery, PersonByUsernameQueryVariables>;
export const PersonProfileDocument = gql`
    query personProfile {
  personProfile {
    id
    username
    email
    attributes {
      id
      content
      issuedDate
      expiresDate
      expired
      certifierID
    }
    roles
    participant {
      id
      name
      msp
    }
    mobilePhone
    postal
    city
    region
    geoLocation
    timezone
    personalInfo
    profile
    firstname
    lastname
    gender
    height
    fatherFirstname
    fatherLastname
    motherFirstname
    motherLastname
    birthDate
    nationality
    country
    documentNumber
    documentType
    cardVersion
    emissionDate
    expirationDate
    emittingEntity
    identityNumber
    fiscalNumber
    socialSecurityNumber
    beneficiaryNumber
    pan
    requestLocation
    otherInformation
    registrationDate
    createdDate
  }
}
    `;

/**
 * __usePersonProfileQuery__
 *
 * To run a query within a React component, call `usePersonProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function usePersonProfileQuery(baseOptions?: Apollo.QueryHookOptions<PersonProfileQuery, PersonProfileQueryVariables>) {
        return Apollo.useQuery<PersonProfileQuery, PersonProfileQueryVariables>(PersonProfileDocument, baseOptions);
      }
export function usePersonProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonProfileQuery, PersonProfileQueryVariables>) {
          return Apollo.useLazyQuery<PersonProfileQuery, PersonProfileQueryVariables>(PersonProfileDocument, baseOptions);
        }
export type PersonProfileQueryHookResult = ReturnType<typeof usePersonProfileQuery>;
export type PersonProfileLazyQueryHookResult = ReturnType<typeof usePersonProfileLazyQuery>;
export type PersonProfileQueryResult = Apollo.QueryResult<PersonProfileQuery, PersonProfileQueryVariables>;
export const PersonsDocument = gql`
    query persons($skip: Int, $take: Int) {
  persons(skip: $skip, take: $take) {
    id
    username
    email
    attributes {
      id
      content
      issuedDate
      expiresDate
      expired
      certifierID
    }
    roles
    participant {
      id
      code
      email
      fundsBalance {
        debit
        credit
        balance
      }
      volunteeringHoursBalance {
        debit
        credit
        balance
      }
      name
      msp
      createdDate
    }
    mobilePhone
    postal
    city
    region
    geoLocation
    timezone
    personalInfo
    profile
    fundsBalance {
      debit
      credit
      balance
    }
    volunteeringHoursBalance {
      debit
      credit
      balance
    }
    goodsStock {
      id
      code
      barCode
      name
      description
      tags
      balance {
        debit
        credit
        balance
      }
      metaData
      metaDataInternal
      createdDate
      createdByPersonId
    }
    firstname
    lastname
    gender
    height
    fatherFirstname
    fatherLastname
    motherFirstname
    motherLastname
    birthDate
    nationality
    country
    documentNumber
    documentType
    cardVersion
    emissionDate
    expirationDate
    emittingEntity
    identityNumber
    fiscalNumber
    socialSecurityNumber
    beneficiaryNumber
    pan
    requestLocation
    otherInformation
    registrationDate
    createdDate
  }
}
    `;

/**
 * __usePersonsQuery__
 *
 * To run a query within a React component, call `usePersonsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function usePersonsQuery(baseOptions?: Apollo.QueryHookOptions<PersonsQuery, PersonsQueryVariables>) {
        return Apollo.useQuery<PersonsQuery, PersonsQueryVariables>(PersonsDocument, baseOptions);
      }
export function usePersonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonsQuery, PersonsQueryVariables>) {
          return Apollo.useLazyQuery<PersonsQuery, PersonsQueryVariables>(PersonsDocument, baseOptions);
        }
export type PersonsQueryHookResult = ReturnType<typeof usePersonsQuery>;
export type PersonsLazyQueryHookResult = ReturnType<typeof usePersonsLazyQuery>;
export type PersonsQueryResult = Apollo.QueryResult<PersonsQuery, PersonsQueryVariables>;
export const ParticipantAddedDocument = gql`
    subscription participantAdded {
  participantAdded {
    id
    name
    msp
  }
}
    `;

/**
 * __useParticipantAddedSubscription__
 *
 * To run a query within a React component, call `useParticipantAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useParticipantAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParticipantAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useParticipantAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ParticipantAddedSubscription, ParticipantAddedSubscriptionVariables>) {
        return Apollo.useSubscription<ParticipantAddedSubscription, ParticipantAddedSubscriptionVariables>(ParticipantAddedDocument, baseOptions);
      }
export type ParticipantAddedSubscriptionHookResult = ReturnType<typeof useParticipantAddedSubscription>;
export type ParticipantAddedSubscriptionResult = Apollo.SubscriptionResult<ParticipantAddedSubscription>;
export const PersonAddedDocument = gql`
    subscription personAdded {
  personAdded {
    id
    firstname
    lastname
    username
    email
    attributes {
      id
      content
      issuedDate
      expiresDate
      expired
      certifierID
    }
    roles
    participant {
      id
      name
      msp
    }
  }
}
    `;

/**
 * __usePersonAddedSubscription__
 *
 * To run a query within a React component, call `usePersonAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePersonAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePersonAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<PersonAddedSubscription, PersonAddedSubscriptionVariables>) {
        return Apollo.useSubscription<PersonAddedSubscription, PersonAddedSubscriptionVariables>(PersonAddedDocument, baseOptions);
      }
export type PersonAddedSubscriptionHookResult = ReturnType<typeof usePersonAddedSubscription>;
export type PersonAddedSubscriptionResult = Apollo.SubscriptionResult<PersonAddedSubscription>;
export const PersonLoggedDocument = gql`
    subscription personLogged {
  personLogged
}
    `;

/**
 * __usePersonLoggedSubscription__
 *
 * To run a query within a React component, call `usePersonLoggedSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePersonLoggedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonLoggedSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePersonLoggedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<PersonLoggedSubscription, PersonLoggedSubscriptionVariables>) {
        return Apollo.useSubscription<PersonLoggedSubscription, PersonLoggedSubscriptionVariables>(PersonLoggedDocument, baseOptions);
      }
export type PersonLoggedSubscriptionHookResult = ReturnType<typeof usePersonLoggedSubscription>;
export type PersonLoggedSubscriptionResult = Apollo.SubscriptionResult<PersonLoggedSubscription>;