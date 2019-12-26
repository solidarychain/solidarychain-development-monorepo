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
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any,
  /** Date custom scalar type */
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
  id: Scalars['String'],
  firstname: Scalars['String'],
  lastname: Scalars['String'],
  username: Scalars['String'],
  password: Scalars['String'],
  email: Scalars['String'],
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
  firstname: Scalars['String'],
  lastname: Scalars['String'],
  username: Scalars['String'],
  email: Scalars['String'],
  attributes?: Maybe<Array<Attribute>>,
  roles?: Maybe<Array<Scalars['String']>>,
  participant: Participant,
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
  )> }
);

export type PersonByIdQueryVariables = {
  id: Scalars['String']
};


export type PersonByIdQuery = (
  { __typename?: 'Query' }
  & { personById: (
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

export type PersonsQueryVariables = {
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>
};


export type PersonsQuery = (
  { __typename?: 'Query' }
  & { persons: Array<(
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
export type PersonAddAttributeMutationFn = ApolloReactCommon.MutationFunction<PersonAddAttributeMutation, PersonAddAttributeMutationVariables>;

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
}
    `;
export type PersonLoginMutationFn = ApolloReactCommon.MutationFunction<PersonLoginMutation, PersonLoginMutationVariables>;

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

    export function useParticipantByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ParticipantByIdQuery, ParticipantByIdQueryVariables>) {
      return ApolloReactHooks.useQuery<ParticipantByIdQuery, ParticipantByIdQueryVariables>(ParticipantByIdDocument, baseOptions);
    }
      export function useParticipantByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ParticipantByIdQuery, ParticipantByIdQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ParticipantByIdQuery, ParticipantByIdQueryVariables>(ParticipantByIdDocument, baseOptions);
      }
      
export type ParticipantByIdQueryHookResult = ReturnType<typeof useParticipantByIdQuery>;
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

    export function useParticipantsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ParticipantsQuery, ParticipantsQueryVariables>) {
      return ApolloReactHooks.useQuery<ParticipantsQuery, ParticipantsQueryVariables>(ParticipantsDocument, baseOptions);
    }
      export function useParticipantsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ParticipantsQuery, ParticipantsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ParticipantsQuery, ParticipantsQueryVariables>(ParticipantsDocument, baseOptions);
      }
      
export type ParticipantsQueryHookResult = ReturnType<typeof useParticipantsQuery>;
export type ParticipantsQueryResult = ApolloReactCommon.QueryResult<ParticipantsQuery, ParticipantsQueryVariables>;
export const PersonByAttributeDocument = gql`
    query personByAttribute($getByAttributeInput: GetByAttributeInput!, $skip: Int, $take: Int) {
  personByAttribute(getByAttributeInput: $getByAttributeInput, skip: $skip, take: $take) {
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

    export function usePersonByAttributeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PersonByAttributeQuery, PersonByAttributeQueryVariables>) {
      return ApolloReactHooks.useQuery<PersonByAttributeQuery, PersonByAttributeQueryVariables>(PersonByAttributeDocument, baseOptions);
    }
      export function usePersonByAttributeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PersonByAttributeQuery, PersonByAttributeQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<PersonByAttributeQuery, PersonByAttributeQueryVariables>(PersonByAttributeDocument, baseOptions);
      }
      
export type PersonByAttributeQueryHookResult = ReturnType<typeof usePersonByAttributeQuery>;
export type PersonByAttributeQueryResult = ApolloReactCommon.QueryResult<PersonByAttributeQuery, PersonByAttributeQueryVariables>;
export const PersonByIdDocument = gql`
    query personById($id: String!) {
  personById(id: $id) {
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

    export function usePersonByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PersonByIdQuery, PersonByIdQueryVariables>) {
      return ApolloReactHooks.useQuery<PersonByIdQuery, PersonByIdQueryVariables>(PersonByIdDocument, baseOptions);
    }
      export function usePersonByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PersonByIdQuery, PersonByIdQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<PersonByIdQuery, PersonByIdQueryVariables>(PersonByIdDocument, baseOptions);
      }
      
export type PersonByIdQueryHookResult = ReturnType<typeof usePersonByIdQuery>;
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

    export function usePersonByUsernameQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PersonByUsernameQuery, PersonByUsernameQueryVariables>) {
      return ApolloReactHooks.useQuery<PersonByUsernameQuery, PersonByUsernameQueryVariables>(PersonByUsernameDocument, baseOptions);
    }
      export function usePersonByUsernameLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PersonByUsernameQuery, PersonByUsernameQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<PersonByUsernameQuery, PersonByUsernameQueryVariables>(PersonByUsernameDocument, baseOptions);
      }
      
export type PersonByUsernameQueryHookResult = ReturnType<typeof usePersonByUsernameQuery>;
export type PersonByUsernameQueryResult = ApolloReactCommon.QueryResult<PersonByUsernameQuery, PersonByUsernameQueryVariables>;
export const PersonProfileDocument = gql`
    query personProfile {
  personProfile {
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

    export function usePersonProfileQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PersonProfileQuery, PersonProfileQueryVariables>) {
      return ApolloReactHooks.useQuery<PersonProfileQuery, PersonProfileQueryVariables>(PersonProfileDocument, baseOptions);
    }
      export function usePersonProfileLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PersonProfileQuery, PersonProfileQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<PersonProfileQuery, PersonProfileQueryVariables>(PersonProfileDocument, baseOptions);
      }
      
export type PersonProfileQueryHookResult = ReturnType<typeof usePersonProfileQuery>;
export type PersonProfileQueryResult = ApolloReactCommon.QueryResult<PersonProfileQuery, PersonProfileQueryVariables>;
export const PersonsDocument = gql`
    query persons($skip: Int, $take: Int) {
  persons(skip: $skip, take: $take) {
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

    export function usePersonsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PersonsQuery, PersonsQueryVariables>) {
      return ApolloReactHooks.useQuery<PersonsQuery, PersonsQueryVariables>(PersonsDocument, baseOptions);
    }
      export function usePersonsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PersonsQuery, PersonsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<PersonsQuery, PersonsQueryVariables>(PersonsDocument, baseOptions);
      }
      
export type PersonsQueryHookResult = ReturnType<typeof usePersonsQuery>;
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

    export function usePersonLoggedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<PersonLoggedSubscription, PersonLoggedSubscriptionVariables>) {
      return ApolloReactHooks.useSubscription<PersonLoggedSubscription, PersonLoggedSubscriptionVariables>(PersonLoggedDocument, baseOptions);
    }
export type PersonLoggedSubscriptionHookResult = ReturnType<typeof usePersonLoggedSubscription>;
export type PersonLoggedSubscriptionResult = ApolloReactCommon.SubscriptionResult<PersonLoggedSubscription>;