import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  JSONObject: any,
  Date: any,
};

export type AddPersonAttributeInput = {
  id: Scalars['ID'],
  content?: Maybe<Scalars['JSONObject']>,
  issuedDate?: Maybe<Scalars['Float']>,
  expiresDate?: Maybe<Scalars['Date']>,
  expired?: Maybe<Scalars['Boolean']>,
  certifierID?: Maybe<Scalars['String']>,
};

export type Attribute = {
   __typename?: 'Attribute',
  id: Scalars['ID'],
  content?: Maybe<Scalars['JSONObject']>,
  issuedDate?: Maybe<Scalars['Float']>,
  expiresDate?: Maybe<Scalars['Date']>,
  expired?: Maybe<Scalars['Boolean']>,
  certifierID?: Maybe<Scalars['String']>,
};


export type GetByAttributeInput = {
  id: Scalars['String'],
  content?: Maybe<Scalars['JSONObject']>,
};


export type LoginPersonInput = {
  username: Scalars['String'],
  password: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  personLogin: PersonLoginResponse,
  personLogout: Scalars['Boolean'],
  revokeUserRefreshTokens: Scalars['Boolean'],
  participantNew: Participant,
  personNew: Person,
  personAddAttribute: Person,
};


export type MutationPersonLoginArgs = {
  loginPersonData: LoginPersonInput
};


export type MutationRevokeUserRefreshTokensArgs = {
  username: Scalars['String']
};


export type MutationParticipantNewArgs = {
  newParticipantData: NewParticipantInput
};


export type MutationPersonNewArgs = {
  newPersonData: NewPersonInput
};


export type MutationPersonAddAttributeArgs = {
  addPersonAttributeData: AddPersonAttributeInput,
  personId: Scalars['String']
};

export type NewParticipantInput = {
  id: Scalars['String'],
  name: Scalars['String'],
};

export type NewPersonInput = {
  id?: Maybe<Scalars['String']>,
  username?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  mobilePhone?: Maybe<Scalars['Float']>,
  postal?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  region?: Maybe<Scalars['String']>,
  geoLocation?: Maybe<Scalars['String']>,
  timezone?: Maybe<Scalars['String']>,
  personalInfo?: Maybe<Scalars['String']>,
  internalInfo?: Maybe<Scalars['String']>,
  profile?: Maybe<Scalars['JSONObject']>,
  firstname?: Maybe<Scalars['String']>,
  lastname?: Maybe<Scalars['String']>,
  gender?: Maybe<Scalars['String']>,
  height?: Maybe<Scalars['Float']>,
  fatherFirstname?: Maybe<Scalars['String']>,
  fatherLastname?: Maybe<Scalars['String']>,
  motherFirstname?: Maybe<Scalars['String']>,
  motherLastname?: Maybe<Scalars['String']>,
  birthDate?: Maybe<Scalars['Date']>,
  nationality?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['String']>,
  documentNumber?: Maybe<Scalars['String']>,
  documentType?: Maybe<Scalars['String']>,
  cardVersion?: Maybe<Scalars['String']>,
  emissionDate?: Maybe<Scalars['Date']>,
  expirationDate?: Maybe<Scalars['Date']>,
  emittingEntity?: Maybe<Scalars['String']>,
  identityNumber?: Maybe<Scalars['String']>,
  fiscalNumber: Scalars['String'],
  socialSecurityNumber?: Maybe<Scalars['String']>,
  beneficiaryNumber?: Maybe<Scalars['String']>,
  pan?: Maybe<Scalars['String']>,
  requestLocation?: Maybe<Scalars['String']>,
  otherInformation?: Maybe<Scalars['String']>,
};

export type Participant = {
   __typename?: 'Participant',
  id: Scalars['ID'],
  name: Scalars['String'],
  msp: Scalars['String'],
  identities: Array<X509Identities>,
};

export type Person = {
   __typename?: 'Person',
  id: Scalars['ID'],
  username?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  attributes?: Maybe<Array<Attribute>>,
  roles?: Maybe<Array<Scalars['String']>>,
  participant: Participant,
  registrationDate: Scalars['Date'],
  mobilePhone?: Maybe<Scalars['Float']>,
  postal?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  region?: Maybe<Scalars['String']>,
  geoLocation?: Maybe<Scalars['String']>,
  timezone?: Maybe<Scalars['String']>,
  personalInfo?: Maybe<Scalars['String']>,
  internalInfo?: Maybe<Scalars['String']>,
  profile?: Maybe<Scalars['JSONObject']>,
  firstname?: Maybe<Scalars['String']>,
  lastname?: Maybe<Scalars['String']>,
  gender?: Maybe<Scalars['String']>,
  height?: Maybe<Scalars['Float']>,
  fatherFirstname?: Maybe<Scalars['String']>,
  fatherLastname?: Maybe<Scalars['String']>,
  motherFirstname?: Maybe<Scalars['String']>,
  motherLastname?: Maybe<Scalars['String']>,
  birthDate?: Maybe<Scalars['Date']>,
  nationality?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['String']>,
  documentNumber?: Maybe<Scalars['String']>,
  documentType?: Maybe<Scalars['String']>,
  cardVersion?: Maybe<Scalars['String']>,
  emissionDate?: Maybe<Scalars['Date']>,
  expirationDate?: Maybe<Scalars['Date']>,
  emittingEntity?: Maybe<Scalars['String']>,
  identityNumber?: Maybe<Scalars['String']>,
  fiscalNumber: Scalars['String'],
  socialSecurityNumber?: Maybe<Scalars['String']>,
  beneficiaryNumber?: Maybe<Scalars['String']>,
  pan?: Maybe<Scalars['String']>,
  requestLocation?: Maybe<Scalars['String']>,
  otherInformation?: Maybe<Scalars['String']>,
};

export type PersonLoginResponse = {
   __typename?: 'PersonLoginResponse',
  user: Person,
  accessToken: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  participantById: Participant,
  participants: Array<Participant>,
  personById: Person,
  personByUsername: Person,
  persons: Array<Person>,
  personByAttribute: Array<Person>,
  personProfile: Person,
};


export type QueryParticipantByIdArgs = {
  id: Scalars['String']
};


export type QueryParticipantsArgs = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>
};


export type QueryPersonByIdArgs = {
  id: Scalars['String']
};


export type QueryPersonByUsernameArgs = {
  username: Scalars['String']
};


export type QueryPersonsArgs = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>
};


export type QueryPersonByAttributeArgs = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
  getByAttributeInput: GetByAttributeInput
};

export type Subscription = {
   __typename?: 'Subscription',
  personLogged: Scalars['String'],
  participantAdded: Participant,
  personAdded: Person,
};

export type X509Identities = {
   __typename?: 'x509Identities',
  id?: Maybe<Scalars['ID']>,
  status: Scalars['Boolean'],
  fingerprint: Scalars['String'],
};

export type NewParticipantDataMutationVariables = {
  newParticipantData: NewParticipantInput
};


export type NewParticipantDataMutation = (
  { __typename?: 'Mutation' }
  & { participantNew: (
    { __typename?: 'Participant' }
    & Pick<Participant, 'id' | 'name' | 'msp'>
    & { identities: Array<(
      { __typename?: 'x509Identities' }
      & Pick<X509Identities, 'id' | 'status' | 'fingerprint'>
    )> }
  ) }
);

export type ParticipantNewMutationVariables = {
  newParticipantData: NewParticipantInput
};


export type ParticipantNewMutation = (
  { __typename?: 'Mutation' }
  & { participantNew: (
    { __typename?: 'Participant' }
    & Pick<Participant, 'id' | 'name' | 'msp'>
    & { identities: Array<(
      { __typename?: 'x509Identities' }
      & Pick<X509Identities, 'id' | 'status' | 'fingerprint'>
    )> }
  ) }
);

export type PersonAddAttributeMutationVariables = {
  personId: Scalars['String'],
  addPersonAttributeData: AddPersonAttributeInput
};


export type PersonAddAttributeMutation = (
  { __typename?: 'Mutation' }
  & { personAddAttribute: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'username' | 'email' | 'roles' | 'mobilePhone' | 'postal' | 'city' | 'region' | 'geoLocation' | 'timezone' | 'personalInfo' | 'internalInfo' | 'profile' | 'firstname' | 'lastname' | 'gender' | 'height' | 'fatherFirstname' | 'fatherLastname' | 'motherFirstname' | 'motherLastname' | 'birthDate' | 'nationality' | 'country' | 'documentNumber' | 'documentType' | 'cardVersion' | 'emissionDate' | 'expirationDate' | 'emittingEntity' | 'identityNumber' | 'fiscalNumber' | 'socialSecurityNumber' | 'beneficiaryNumber' | 'pan' | 'requestLocation' | 'otherInformation' | 'registrationDate'>
    & { attributes: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
      & { identities: Array<(
        { __typename?: 'x509Identities' }
        & Pick<X509Identities, 'id' | 'status' | 'fingerprint'>
      )> }
    ) }
  ) }
);

export type PersonLoginMutationVariables = {
  loginPersonData: LoginPersonInput
};


export type PersonLoginMutation = (
  { __typename?: 'Mutation' }
  & { personLogin: (
    { __typename?: 'PersonLoginResponse' }
    & Pick<PersonLoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'Person' }
      & Pick<Person, 'id' | 'username' | 'email' | 'roles' | 'mobilePhone' | 'postal' | 'city' | 'region' | 'geoLocation' | 'timezone' | 'personalInfo' | 'internalInfo' | 'profile' | 'firstname' | 'lastname' | 'gender' | 'height' | 'fatherFirstname' | 'fatherLastname' | 'motherFirstname' | 'motherLastname' | 'birthDate' | 'nationality' | 'country' | 'documentNumber' | 'documentType' | 'cardVersion' | 'emissionDate' | 'expirationDate' | 'emittingEntity' | 'identityNumber' | 'fiscalNumber' | 'socialSecurityNumber' | 'beneficiaryNumber' | 'pan' | 'requestLocation' | 'otherInformation' | 'registrationDate'>
      & { attributes: Maybe<Array<(
        { __typename?: 'Attribute' }
        & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
      )>>, participant: (
        { __typename?: 'Participant' }
        & Pick<Participant, 'id' | 'name' | 'msp'>
        & { identities: Array<(
          { __typename?: 'x509Identities' }
          & Pick<X509Identities, 'id' | 'status' | 'fingerprint'>
        )> }
      ) }
    ) }
  ) }
);

export type PersonLogoutMutationVariables = {};


export type PersonLogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'personLogout'>
);

export type PersonNewMutationVariables = {
  newPersonData: NewPersonInput
};


export type PersonNewMutation = (
  { __typename?: 'Mutation' }
  & { personNew: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'firstname' | 'lastname' | 'username' | 'email' | 'roles'>
    & { attributes: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
      & { identities: Array<(
        { __typename?: 'x509Identities' }
        & Pick<X509Identities, 'id' | 'status' | 'fingerprint'>
      )> }
    ) }
  ) }
);

export type ParticipantByIdQueryVariables = {
  id: Scalars['String']
};


export type ParticipantByIdQuery = (
  { __typename?: 'Query' }
  & { participantById: (
    { __typename?: 'Participant' }
    & Pick<Participant, 'id' | 'name' | 'msp'>
    & { identities: Array<(
      { __typename?: 'x509Identities' }
      & Pick<X509Identities, 'id' | 'status' | 'fingerprint'>
    )> }
  ) }
);

export type ParticipantsQueryVariables = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>
};


export type ParticipantsQuery = (
  { __typename?: 'Query' }
  & { participants: Array<(
    { __typename?: 'Participant' }
    & Pick<Participant, 'id' | 'name' | 'msp'>
    & { identities: Array<(
      { __typename?: 'x509Identities' }
      & Pick<X509Identities, 'id' | 'status' | 'fingerprint'>
    )> }
  )> }
);

export type PersonByAttributeQueryVariables = {
  getByAttributeInput: GetByAttributeInput,
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>
};


export type PersonByAttributeQuery = (
  { __typename?: 'Query' }
  & { personByAttribute: Array<(
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'username' | 'email' | 'roles' | 'mobilePhone' | 'postal' | 'city' | 'region' | 'geoLocation' | 'timezone' | 'personalInfo' | 'internalInfo' | 'profile' | 'firstname' | 'lastname' | 'gender' | 'height' | 'fatherFirstname' | 'fatherLastname' | 'motherFirstname' | 'motherLastname' | 'birthDate' | 'nationality' | 'country' | 'documentNumber' | 'documentType' | 'cardVersion' | 'emissionDate' | 'expirationDate' | 'emittingEntity' | 'identityNumber' | 'fiscalNumber' | 'socialSecurityNumber' | 'beneficiaryNumber' | 'pan' | 'requestLocation' | 'otherInformation' | 'registrationDate'>
    & { attributes: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
      & { identities: Array<(
        { __typename?: 'x509Identities' }
        & Pick<X509Identities, 'id' | 'status' | 'fingerprint'>
      )> }
    ) }
  )> }
);

export type PersonByIdQueryVariables = {
  id: Scalars['String']
};


export type PersonByIdQuery = (
  { __typename?: 'Query' }
  & { personById: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'username' | 'email' | 'roles' | 'mobilePhone' | 'postal' | 'city' | 'region' | 'geoLocation' | 'timezone' | 'personalInfo' | 'internalInfo' | 'profile' | 'firstname' | 'lastname' | 'gender' | 'height' | 'fatherFirstname' | 'fatherLastname' | 'motherFirstname' | 'motherLastname' | 'birthDate' | 'nationality' | 'country' | 'documentNumber' | 'documentType' | 'cardVersion' | 'emissionDate' | 'expirationDate' | 'emittingEntity' | 'identityNumber' | 'fiscalNumber' | 'socialSecurityNumber' | 'beneficiaryNumber' | 'pan' | 'requestLocation' | 'otherInformation' | 'registrationDate'>
    & { attributes: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
      & { identities: Array<(
        { __typename?: 'x509Identities' }
        & Pick<X509Identities, 'id' | 'status' | 'fingerprint'>
      )> }
    ) }
  ) }
);

export type PersonByUsernameQueryVariables = {
  username: Scalars['String']
};


export type PersonByUsernameQuery = (
  { __typename?: 'Query' }
  & { personByUsername: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'firstname' | 'lastname' | 'username' | 'email' | 'roles'>
    & { attributes: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
      & { identities: Array<(
        { __typename?: 'x509Identities' }
        & Pick<X509Identities, 'id' | 'status' | 'fingerprint'>
      )> }
    ) }
  ) }
);

export type PersonProfileQueryVariables = {};


export type PersonProfileQuery = (
  { __typename?: 'Query' }
  & { personProfile: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'username' | 'email' | 'roles' | 'mobilePhone' | 'postal' | 'city' | 'region' | 'geoLocation' | 'timezone' | 'personalInfo' | 'internalInfo' | 'profile' | 'firstname' | 'lastname' | 'gender' | 'height' | 'fatherFirstname' | 'fatherLastname' | 'motherFirstname' | 'motherLastname' | 'birthDate' | 'nationality' | 'country' | 'documentNumber' | 'documentType' | 'cardVersion' | 'emissionDate' | 'expirationDate' | 'emittingEntity' | 'identityNumber' | 'fiscalNumber' | 'socialSecurityNumber' | 'beneficiaryNumber' | 'pan' | 'requestLocation' | 'otherInformation' | 'registrationDate'>
    & { attributes: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
      & { identities: Array<(
        { __typename?: 'x509Identities' }
        & Pick<X509Identities, 'id' | 'status' | 'fingerprint'>
      )> }
    ) }
  ) }
);

export type PersonsQueryVariables = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>
};


export type PersonsQuery = (
  { __typename?: 'Query' }
  & { persons: Array<(
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'username' | 'email' | 'roles' | 'mobilePhone' | 'postal' | 'city' | 'region' | 'geoLocation' | 'timezone' | 'personalInfo' | 'internalInfo' | 'profile' | 'firstname' | 'lastname' | 'gender' | 'height' | 'fatherFirstname' | 'fatherLastname' | 'motherFirstname' | 'motherLastname' | 'birthDate' | 'nationality' | 'country' | 'documentNumber' | 'documentType' | 'cardVersion' | 'emissionDate' | 'expirationDate' | 'emittingEntity' | 'identityNumber' | 'fiscalNumber' | 'socialSecurityNumber' | 'beneficiaryNumber' | 'pan' | 'requestLocation' | 'otherInformation' | 'registrationDate'>
    & { attributes: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
      & { identities: Array<(
        { __typename?: 'x509Identities' }
        & Pick<X509Identities, 'id' | 'status' | 'fingerprint'>
      )> }
    ) }
  )> }
);

export type ParticipantAddedSubscriptionVariables = {};


export type ParticipantAddedSubscription = (
  { __typename?: 'Subscription' }
  & { participantAdded: (
    { __typename?: 'Participant' }
    & Pick<Participant, 'id' | 'name' | 'msp'>
    & { identities: Array<(
      { __typename?: 'x509Identities' }
      & Pick<X509Identities, 'id' | 'status' | 'fingerprint'>
    )> }
  ) }
);

export type PersonAddedSubscriptionVariables = {};


export type PersonAddedSubscription = (
  { __typename?: 'Subscription' }
  & { personAdded: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'firstname' | 'lastname' | 'username' | 'email' | 'roles'>
    & { attributes: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
      & { identities: Array<(
        { __typename?: 'x509Identities' }
        & Pick<X509Identities, 'id' | 'status' | 'fingerprint'>
      )> }
    ) }
  ) }
);

export type PersonLoggedSubscriptionVariables = {};


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
    identities {
      id
      status
      fingerprint
    }
  }
}
    `;
export type NewParticipantDataMutationFn = ApolloReactCommon.MutationFunction<NewParticipantDataMutation, NewParticipantDataMutationVariables>;

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
export function useNewParticipantDataMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<NewParticipantDataMutation, NewParticipantDataMutationVariables>) {
        return ApolloReactHooks.useMutation<NewParticipantDataMutation, NewParticipantDataMutationVariables>(NewParticipantDataDocument, baseOptions);
      }
export type NewParticipantDataMutationHookResult = ReturnType<typeof useNewParticipantDataMutation>;
export type NewParticipantDataMutationResult = ApolloReactCommon.MutationResult<NewParticipantDataMutation>;
export type NewParticipantDataMutationOptions = ApolloReactCommon.BaseMutationOptions<NewParticipantDataMutation, NewParticipantDataMutationVariables>;
export const ParticipantNewDocument = gql`
    mutation participantNew($newParticipantData: NewParticipantInput!) {
  participantNew(newParticipantData: $newParticipantData) {
    id
    name
    msp
    identities {
      id
      status
      fingerprint
    }
  }
}
    `;
export type ParticipantNewMutationFn = ApolloReactCommon.MutationFunction<ParticipantNewMutation, ParticipantNewMutationVariables>;

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
export function useParticipantNewMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ParticipantNewMutation, ParticipantNewMutationVariables>) {
        return ApolloReactHooks.useMutation<ParticipantNewMutation, ParticipantNewMutationVariables>(ParticipantNewDocument, baseOptions);
      }
export type ParticipantNewMutationHookResult = ReturnType<typeof useParticipantNewMutation>;
export type ParticipantNewMutationResult = ApolloReactCommon.MutationResult<ParticipantNewMutation>;
export type ParticipantNewMutationOptions = ApolloReactCommon.BaseMutationOptions<ParticipantNewMutation, ParticipantNewMutationVariables>;
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
      identities {
        id
        status
        fingerprint
      }
    }
    mobilePhone
    postal
    city
    region
    geoLocation
    timezone
    personalInfo
    internalInfo
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
export type PersonAddAttributeMutationFn = ApolloReactCommon.MutationFunction<PersonAddAttributeMutation, PersonAddAttributeMutationVariables>;

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
export function usePersonAddAttributeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PersonAddAttributeMutation, PersonAddAttributeMutationVariables>) {
        return ApolloReactHooks.useMutation<PersonAddAttributeMutation, PersonAddAttributeMutationVariables>(PersonAddAttributeDocument, baseOptions);
      }
export type PersonAddAttributeMutationHookResult = ReturnType<typeof usePersonAddAttributeMutation>;
export type PersonAddAttributeMutationResult = ApolloReactCommon.MutationResult<PersonAddAttributeMutation>;
export type PersonAddAttributeMutationOptions = ApolloReactCommon.BaseMutationOptions<PersonAddAttributeMutation, PersonAddAttributeMutationVariables>;
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
        identities {
          id
          status
          fingerprint
        }
      }
      mobilePhone
      postal
      city
      region
      geoLocation
      timezone
      personalInfo
      internalInfo
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
export type PersonLoginMutationFn = ApolloReactCommon.MutationFunction<PersonLoginMutation, PersonLoginMutationVariables>;

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
export function usePersonLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PersonLoginMutation, PersonLoginMutationVariables>) {
        return ApolloReactHooks.useMutation<PersonLoginMutation, PersonLoginMutationVariables>(PersonLoginDocument, baseOptions);
      }
export type PersonLoginMutationHookResult = ReturnType<typeof usePersonLoginMutation>;
export type PersonLoginMutationResult = ApolloReactCommon.MutationResult<PersonLoginMutation>;
export type PersonLoginMutationOptions = ApolloReactCommon.BaseMutationOptions<PersonLoginMutation, PersonLoginMutationVariables>;
export const PersonLogoutDocument = gql`
    mutation personLogout {
  personLogout
}
    `;
export type PersonLogoutMutationFn = ApolloReactCommon.MutationFunction<PersonLogoutMutation, PersonLogoutMutationVariables>;

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
export function usePersonLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PersonLogoutMutation, PersonLogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<PersonLogoutMutation, PersonLogoutMutationVariables>(PersonLogoutDocument, baseOptions);
      }
export type PersonLogoutMutationHookResult = ReturnType<typeof usePersonLogoutMutation>;
export type PersonLogoutMutationResult = ApolloReactCommon.MutationResult<PersonLogoutMutation>;
export type PersonLogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<PersonLogoutMutation, PersonLogoutMutationVariables>;
export const PersonNewDocument = gql`
    mutation personNew($newPersonData: NewPersonInput!) {
  personNew(newPersonData: $newPersonData) {
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
      identities {
        id
        status
        fingerprint
      }
    }
  }
}
    `;
export type PersonNewMutationFn = ApolloReactCommon.MutationFunction<PersonNewMutation, PersonNewMutationVariables>;

/**
 * __usePersonNewMutation__
 *
 * To run a mutation, you first call `usePersonNewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePersonNewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [personNewMutation, { data, loading, error }] = usePersonNewMutation({
 *   variables: {
 *      newPersonData: // value for 'newPersonData'
 *   },
 * });
 */
export function usePersonNewMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PersonNewMutation, PersonNewMutationVariables>) {
        return ApolloReactHooks.useMutation<PersonNewMutation, PersonNewMutationVariables>(PersonNewDocument, baseOptions);
      }
export type PersonNewMutationHookResult = ReturnType<typeof usePersonNewMutation>;
export type PersonNewMutationResult = ApolloReactCommon.MutationResult<PersonNewMutation>;
export type PersonNewMutationOptions = ApolloReactCommon.BaseMutationOptions<PersonNewMutation, PersonNewMutationVariables>;
export const ParticipantByIdDocument = gql`
    query participantById($id: String!) {
  participantById(id: $id) {
    id
    name
    msp
    identities {
      id
      status
      fingerprint
    }
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
export function useParticipantByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ParticipantByIdQuery, ParticipantByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<ParticipantByIdQuery, ParticipantByIdQueryVariables>(ParticipantByIdDocument, baseOptions);
      }
export function useParticipantByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ParticipantByIdQuery, ParticipantByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ParticipantByIdQuery, ParticipantByIdQueryVariables>(ParticipantByIdDocument, baseOptions);
        }
export type ParticipantByIdQueryHookResult = ReturnType<typeof useParticipantByIdQuery>;
export type ParticipantByIdLazyQueryHookResult = ReturnType<typeof useParticipantByIdLazyQuery>;
export type ParticipantByIdQueryResult = ApolloReactCommon.QueryResult<ParticipantByIdQuery, ParticipantByIdQueryVariables>;
export const ParticipantsDocument = gql`
    query participants($skip: Int, $take: Int) {
  participants(skip: $skip, take: $take) {
    id
    name
    msp
    identities {
      id
      status
      fingerprint
    }
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
export function useParticipantsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ParticipantsQuery, ParticipantsQueryVariables>) {
        return ApolloReactHooks.useQuery<ParticipantsQuery, ParticipantsQueryVariables>(ParticipantsDocument, baseOptions);
      }
export function useParticipantsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ParticipantsQuery, ParticipantsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ParticipantsQuery, ParticipantsQueryVariables>(ParticipantsDocument, baseOptions);
        }
export type ParticipantsQueryHookResult = ReturnType<typeof useParticipantsQuery>;
export type ParticipantsLazyQueryHookResult = ReturnType<typeof useParticipantsLazyQuery>;
export type ParticipantsQueryResult = ApolloReactCommon.QueryResult<ParticipantsQuery, ParticipantsQueryVariables>;
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
      identities {
        id
        status
        fingerprint
      }
    }
    mobilePhone
    postal
    city
    region
    geoLocation
    timezone
    personalInfo
    internalInfo
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
export function usePersonByAttributeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PersonByAttributeQuery, PersonByAttributeQueryVariables>) {
        return ApolloReactHooks.useQuery<PersonByAttributeQuery, PersonByAttributeQueryVariables>(PersonByAttributeDocument, baseOptions);
      }
export function usePersonByAttributeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PersonByAttributeQuery, PersonByAttributeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PersonByAttributeQuery, PersonByAttributeQueryVariables>(PersonByAttributeDocument, baseOptions);
        }
export type PersonByAttributeQueryHookResult = ReturnType<typeof usePersonByAttributeQuery>;
export type PersonByAttributeLazyQueryHookResult = ReturnType<typeof usePersonByAttributeLazyQuery>;
export type PersonByAttributeQueryResult = ApolloReactCommon.QueryResult<PersonByAttributeQuery, PersonByAttributeQueryVariables>;
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
      identities {
        id
        status
        fingerprint
      }
    }
    mobilePhone
    postal
    city
    region
    geoLocation
    timezone
    personalInfo
    internalInfo
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
export function usePersonByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PersonByIdQuery, PersonByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<PersonByIdQuery, PersonByIdQueryVariables>(PersonByIdDocument, baseOptions);
      }
export function usePersonByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PersonByIdQuery, PersonByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PersonByIdQuery, PersonByIdQueryVariables>(PersonByIdDocument, baseOptions);
        }
export type PersonByIdQueryHookResult = ReturnType<typeof usePersonByIdQuery>;
export type PersonByIdLazyQueryHookResult = ReturnType<typeof usePersonByIdLazyQuery>;
export type PersonByIdQueryResult = ApolloReactCommon.QueryResult<PersonByIdQuery, PersonByIdQueryVariables>;
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
      identities {
        id
        status
        fingerprint
      }
    }
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
export function usePersonByUsernameQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PersonByUsernameQuery, PersonByUsernameQueryVariables>) {
        return ApolloReactHooks.useQuery<PersonByUsernameQuery, PersonByUsernameQueryVariables>(PersonByUsernameDocument, baseOptions);
      }
export function usePersonByUsernameLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PersonByUsernameQuery, PersonByUsernameQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PersonByUsernameQuery, PersonByUsernameQueryVariables>(PersonByUsernameDocument, baseOptions);
        }
export type PersonByUsernameQueryHookResult = ReturnType<typeof usePersonByUsernameQuery>;
export type PersonByUsernameLazyQueryHookResult = ReturnType<typeof usePersonByUsernameLazyQuery>;
export type PersonByUsernameQueryResult = ApolloReactCommon.QueryResult<PersonByUsernameQuery, PersonByUsernameQueryVariables>;
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
      identities {
        id
        status
        fingerprint
      }
    }
    mobilePhone
    postal
    city
    region
    geoLocation
    timezone
    personalInfo
    internalInfo
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
export function usePersonProfileQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PersonProfileQuery, PersonProfileQueryVariables>) {
        return ApolloReactHooks.useQuery<PersonProfileQuery, PersonProfileQueryVariables>(PersonProfileDocument, baseOptions);
      }
export function usePersonProfileLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PersonProfileQuery, PersonProfileQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PersonProfileQuery, PersonProfileQueryVariables>(PersonProfileDocument, baseOptions);
        }
export type PersonProfileQueryHookResult = ReturnType<typeof usePersonProfileQuery>;
export type PersonProfileLazyQueryHookResult = ReturnType<typeof usePersonProfileLazyQuery>;
export type PersonProfileQueryResult = ApolloReactCommon.QueryResult<PersonProfileQuery, PersonProfileQueryVariables>;
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
      name
      msp
      identities {
        id
        status
        fingerprint
      }
    }
    mobilePhone
    postal
    city
    region
    geoLocation
    timezone
    personalInfo
    internalInfo
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
export function usePersonsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PersonsQuery, PersonsQueryVariables>) {
        return ApolloReactHooks.useQuery<PersonsQuery, PersonsQueryVariables>(PersonsDocument, baseOptions);
      }
export function usePersonsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PersonsQuery, PersonsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PersonsQuery, PersonsQueryVariables>(PersonsDocument, baseOptions);
        }
export type PersonsQueryHookResult = ReturnType<typeof usePersonsQuery>;
export type PersonsLazyQueryHookResult = ReturnType<typeof usePersonsLazyQuery>;
export type PersonsQueryResult = ApolloReactCommon.QueryResult<PersonsQuery, PersonsQueryVariables>;
export const ParticipantAddedDocument = gql`
    subscription participantAdded {
  participantAdded {
    id
    name
    msp
    identities {
      id
      status
      fingerprint
    }
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
export function useParticipantAddedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<ParticipantAddedSubscription, ParticipantAddedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<ParticipantAddedSubscription, ParticipantAddedSubscriptionVariables>(ParticipantAddedDocument, baseOptions);
      }
export type ParticipantAddedSubscriptionHookResult = ReturnType<typeof useParticipantAddedSubscription>;
export type ParticipantAddedSubscriptionResult = ApolloReactCommon.SubscriptionResult<ParticipantAddedSubscription>;
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
      identities {
        id
        status
        fingerprint
      }
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
export function usePersonAddedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<PersonAddedSubscription, PersonAddedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<PersonAddedSubscription, PersonAddedSubscriptionVariables>(PersonAddedDocument, baseOptions);
      }
export type PersonAddedSubscriptionHookResult = ReturnType<typeof usePersonAddedSubscription>;
export type PersonAddedSubscriptionResult = ApolloReactCommon.SubscriptionResult<PersonAddedSubscription>;
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
export function usePersonLoggedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<PersonLoggedSubscription, PersonLoggedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<PersonLoggedSubscription, PersonLoggedSubscriptionVariables>(PersonLoggedDocument, baseOptions);
      }
export type PersonLoggedSubscriptionHookResult = ReturnType<typeof usePersonLoggedSubscription>;
export type PersonLoggedSubscriptionResult = ApolloReactCommon.SubscriptionResult<PersonLoggedSubscription>;