# ToDo

## Rest API

- [D] Swagger Docs
  - [D] Finish all `@ApiOperation` and `@ApiResponse`
  - [D] Add JWT to Api, and Login User with moked UserService
- [D] Can't duplicate same attribute ex can have 2 birth-year's ?
  - Try to update birth-year
- [D] env.ts refactor to be used has `e.swaggerModuleTitle`
- [D] Create Endpoint GetAll Participants
- [D] Https and CORS
- [D] Create GitLab Repository for project `NodeNestJsHyperLedgerConvectorRestStarter`
- [D] Change `network.solidary.convector.*` to `io.worldsibu.*` (must renew ledger)
  - [D] use vars from common package
- [-] Ledger authentication, ex users are created in a ledger by one organization, that creates user and its password, store users auth on ledger on couchdb
  - `packages/server/src/auth/jwt.strategy.ts` For example, we could do a database lookup in our validate() method to extract more information about the user, resulting in a more enriched user object being available in our Request. This is also the place we may decide to do further token validation, such as looking up the userId in a list of revoked tokens, enabling us to perform token revocation  
  (User must be created by organization, can be attributed to oauth2 account like gmail)
  [X] User must belong to one organization, else usernames can collide in same Ledger, store Participant relation in Person.Participant
    [-] Create 2 or more users with same username, but in different Participants
- [X] Nest.js/GraphQL with AuthGuards
- [X] Refactor `@solidary-network/common` to other name (remove rest for ex to work with graphql and rest)

- [-] Add Explore the Blocks <https://docs.worldsibu.com/article/92-explore-blocks>
- [-] Debug SmartContract in VsCode Notes
- [-] Debug SmartContract Logs Notes
- [-] Static Content: Redirect to front end. Root show Read Me or Redirect to React FrontEnd
- [-] Add more tests, ex add from couchdb tutorial
- [-] CouchDb UserService <https://docs.worldsibu.com/article/101-tutorial-advanced-couchdb#direct-couchdb>

add filter Participant
nao e o gov e a entidade q esta a rolar ligada ao blockchain

## GraphQL API

use new ts-node....
Add Yup Validations

[ ] roles array?
  add user with roles array
  invoke and graphql / rest

[X] https and http to https redirect
[ ] roles
[ ] paginate

all methods cc
  participant
    [X] register
    [ ] changeIdentity
    [X] get
    [X] getAll
  person
    [X] create
    [X] addAttribute
    [X] get
    [X] getAll
    [ ] getByAttribute
    [ ] getByUsername
  
login mutation > jwt
authentication/authorization

receive transaction id, to store in neo4j

## Todo: NOTES and README

- [-] Finish `packages/server-rest/README.md`
- [-] Replace all Curls `curl http://localhost:3000/participant/gov` with auth and https, ex curl -k `https://localhost:3443/api/participant/gov`
- [-] Checkout whole repo and test all in other folder without dependencies etc
- [-] all curls add /api/, -h token 
- [-] all curls all hurley invoke equivalent

- [X] Protect from create Person with same username, fiscalNumber and Id


create user only with fiscalNumber
start transaction module
mutations
	update person with citizenCard data
	change profile > username, password, email, phone, mobilePhone, district, coordinates, reputation(object), personalInfo, internalInfo



GENERATE solidary.network certificates
and use it in project graphqlserver etc
change localhost to domain




packages/server-graphql/src/participant/models/x509Identities.model.ts
move to
packages/server-graphql/src/common/models


  // public transactionType: TransactionType;
  // public resourceType: ResourceType;
  // public input: Entity;
  // public output: Entity;
  // public quantity: number;
  // public currency: string;
  // public location: string;
  // public metaData: any;
  // public metaDataInternal: any;
  // public created: number;

- [-] add CREATED to Person and all models, change to createdDate
- [-] rename `common` to `common-cc`
- [-] add cause graphql module

## React FrontEnd

- [-] Clean state after logout







change created to createdDate


and add



mail dont have validate rule


graphql models dont have any validation?

add participant, identities and created, to all gql queries and mutations

change common to common-cc

rename file x090 identities para nao dar confusao ex um e -cc


use same 
  @Field()
  @IsDefined()
  public participant: Participant;
in all



return good message when user not exists etc
