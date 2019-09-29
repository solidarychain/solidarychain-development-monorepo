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

export type AccessToken = {
   __typename?: 'AccessToken',
  accessToken: Scalars['String'],
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
  personLogin: AccessToken,
  revokeUserRefreshTokens: Scalars['Boolean'],
  participantNew: Participant,
  personNew: Person,
  personAddAttribute: Person,
  personProfile: Person,
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

export type Query = {
   __typename?: 'Query',
  participantById: Participant,
  participants: Array<Participant>,
  personById: Person,
  personByUsername: Person,
  persons: Array<Person>,
  personByAttribute: Array<Person>,
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