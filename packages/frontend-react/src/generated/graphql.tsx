import gql from 'graphql-tag';
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
export type Unnamed_1_QueryVariables = {
  id: Scalars['String']
};


export type Unnamed_1_Query = (
  { __typename?: 'Query' }
  & {
    participantById: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
      & {
        identities: Array<(
          { __typename?: 'x509Identities' }
          & Pick<X509Identities, 'id' | 'status' | 'fingerprint'>
        )>
      }
    )
  }
);
