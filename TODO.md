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
- [X] Refactor `@solidary-network/common-cc` to other name (remove rest for ex to work with graphql and rest)

- [-] Add Explore the Blocks <https://docs.worldsibu.com/article/92-explore-blocks>
- [X] Debug SmartContract in VsCode Notes
- [X] Debug SmartContract Logs Notes
- [-] Static Content: Redirect to front end. Root show Read Me or Redirect to React FrontEnd
- [-] Add more tests, ex add from couchdb tutorial
- [-] CouchDb UserService <https://docs.worldsibu.com/article/101-tutorial-advanced-couchdb#direct-couchdb>

## GraphQL API

[X] roles array?
  add user with roles array
  invoke and graphql / rest

[X] https and http to https redirect
[X] roles
[X] paginate

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
    [X] getByAttribute
    [X] getByUsername
    [X] getByFiscalnumber
auth  
  [x] login mutation > jwt
  [x] authentication/authorization

receive transaction id, to store in neo4j

## Todo: NOTES and README

- [-] Finish `packages/server-rest/README.md`
- [-] Replace all Curls `curl http://localhost:3000/participant/gov` with auth and https, ex curl -k `https://localhost:3443/api/participant/gov`
- [-] Checkout whole repo and test all in other folder without dependencies etc
- [-] all curls add /api/, -h token
- [-] all curls all hurley invoke equivalent

- [X] Protect from create Person with same username, fiscalNumber and Id
- [X] create user only with fiscalNumber


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

some class don't have public

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



















----------------------------------------------------------------------

add checkDuplicatedField to all models
checkDuplicatedField('code', code);
checkDuplicatedField('name', name);



participant validate chaincode and throw if with same name and code exists, currently it pass
   check if participant with same code exists and throw ex


transfer PROPTECTION cant transfer when input and output is the same

fix public async ALL getAll(), getAll suffer from the same problem is get, dont use participants :( get all records without separate by participants


change username to ownerUsername
validations of transfers like mus be the owner, and owner cannot tranfer to is self
particpiantByCode


BUG, or leave it this way: Asset.name is not unique, we can create Assets with same name


TODO Check Complexfilter that returns empty, must be because of user and org -u -o 



  "_id": "c8ca045c-9d1b-407f-b9ae-31711758f2d0",
  "code": "gov",

  "_id": "61868772-4afd-4f94-af6a-8c87cf450f8e",
  "code": "mit",

$or
{
   "selector": {
      "type": "network.solidary.convector.participant",
      "_id": "c8ca045c-9d1b-407f-b9ae-31711758f2d0",
      "participant": {
         "_id": "61868772-4afd-4f94-af6a-8c87cf450f8e"
$or "code":"gov"
      }
   }
}


HOW TO USE ROLES, pass ROLES LIKE USER TO TRANSFEREN ASSETS



gov: "2E:7F:BF:1D:0F:2E:8E:5B:BB:49:E0:B6:C2:D5:FA:B7:21:B6:2C:F2"

add participant assign to participants other than gov, 




add field code to gql participant and test in gqlqueries

all gql and seed using new participant 
id and code





Cannot connect to runtime; make sure that runtime is in 'legacy' debug mode.









    ConvectorModel.getOne = function (id, type, storageOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var content, model;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        type = type || this;
                        return [4, convector_core_storage_1.BaseStorage.current.get(id, storageOptions)];
                    case 1:
                        content = _a.sent();
                        model = new type(content);
                        if ((content && model) && content.type !== model.type) {
                            throw new Error("Possible ID collision, element " + id + " of type " + content.type + " is not " + model.type);
                        }
                        return [2, model];
                }
            });
        });
    };


CLEAN UP CODE AFTER FINISH PROJECT
CREATE SOME INVOKES TO FILL DATA


think about if we can register assets with same name like same BOOK NAME for ex, can be more than one in trade, but belong to diferent owners
"There is a asset registered with that name already (Asset009)"



ERROR cant create models with and exitingig used id in other model says
"message": "\n    CLIENT_RES_ERR\n    There was a problem while invoking the chaincode\n    Chaincode error, this is a wrapper around the responses\n\n    Original stack:\n    {\"name\":\"Error\",\"status\":500,\"message\":\"There is a cause with that Id already (acef70e5-cd25-4533-8392-9fa57e43cf16)\"}\n


refactor all calls to .getOne with our custom getOne, to work with types etc
const exists = await Person.getOne(person.id);