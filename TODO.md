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


HOW TO USE ROLES, pass ROLES LIKE USER TO TRANSFER ASSETS






todo transfer assets to Entity, Participants, and Causes




add changeIdentity GraphQL stuff
participantChangeIdentity[TODO]


FOR NOW LEAVE IT
there is no need to store this, leave it commented
REMOVE all model.participant = 
ex
person.participant = gov;






--------------------------------------------------------------------------------------------------------------------------------------------------------------

- [X] add common function `checkValidPersons` to common to not have circular dependencies and use it Participants and Transactions, in participants are comment `// TODO: enable again`
- [X] create a common function in common to get loggedPerson model from richQuery, this way we don't have circular dependencies `const loggedPerson: Person = await Person.getById(transaction.loggedPersonId);`
- [X] Get Rid of all getOne(id)
- [X] get all username, id and roles in all controllers (shared function), and add use it it in `transaction.createdByPersonId = transaction.loggedPersonId;`
- [X] Add createdByPersonId to all models
- [X] edit all models, add ambassadors to cause and participants, and asset todo
- [X] Remove owner from ambassador array, is used, NOT NEED
- [-] finish transfers when are one of the ambassadors in asset, cause and participant
- [ ] transfer amount's, and transferable types ex we can't transfer when amount ex 1000 -100 = 900
  - [ ]  add totals from every type ex currently we can only transfer UnitType.Funds from participants, person and causes if has amount, if is owner or ambassador
  - [ ]  must discount from one and add to other, maybe only add to other because we dont know how much one person have, only causes and participants have amount?
  - [ ]  convert all currencies to EUR before add to ledger, store original currency and cambio used ex currencyOrg: USD, quantityOrg: 1.45, cambio: 1.12

- [ ] Quantity start be teh quantity like how many items, and amount is the totalAmount of the transfer
- [ ] Add unitPrice

- [ ] Model Bag of Googs with EAN, name, quantity, priceUnit, amount, and a global for Totals, like a JsonObejct

https://github.com/apache/couchdb/issues/1254
{
	"selector": {
		"type": "network.solidary.convector.transaction",
		"resourceType": "FUNDS",
		"transactionType": "CREATE",
		"currency": "EUR",
		"output": {
			"entity": {
				"id": "4ea88521-031b-4279-9165-9c10e1839053"
			}
		}
	},
	"aggregator": {
		"operation": "sum",
		"of": ["quantity"]
	}
}
Error running query. Reason: (invalid_key) Invalid key aggregator for this request.



- [ ] update Person with NIF with extended citizenCard data
- [ ] Update Models, add subscription to all models


- [ ] Add updatedByPersonId to all models
- [ ] Add updatedDate to all models

improve transferes, to use all modes

person > person
person > cause
person > participant

cause > person
participant > person

protections
asset: only ambassador or OWNER can transfer resources from causes to ENTITIES
cause: only ambassador can transfer resources from causes to ENTITIES
participant: only ambassador can transfer resources from participant to ENTITIES

--------------------------------------------------------------------------------------------------------------------------------------------------------------

EVERY CAUSE and PARTICIPANT has an RESPONSIBLE for the assets, and only this Person can Transfer Assets
or money etc to others entitys and this resolve authentications problems,
just add property administrator or array of administrators


participants, causes and assets have array of responsaveis q podem transferir assets ou resources como money etc
asset array of responsaveis q podem transacionar o asset


Mas já veria o embaixador de uma causa, por exemplo
ambassador
ambassadors



  @Validate(yup.array().of(yup.string()))
  public tags: string[];


remove all identities return fields from graphql, identities must be protected


try to hack ownerUsername and ambassadorUsername, username comes to graphql api from JTW seems to secure to be hacked in api


common func to check if username (ownerUsername | ambassadorUsername) exists, throw inside it

validation check that ambassadorUsername exists

default ambassadorUsername is cause is the user that creates it
default ambassadorUsername is participant is the user that creates it
default ambassadorUsername is asset is the user that creates it

// owner : send by graphql api
@Validate(yup.string())
public ambassadorUsername: string;

add ambassadorUsername to graphql models and test it in queries

DONT FORGET to add argument ambassador to Participant
we can have objects yet
maybe we dont need it because participants create causes :) and is in cause that is the ambassadorUsername

--------------------------------------------------------------------------------------------------------------------------------------------------------------

- [-] Add Goods Transactions to seed
- [-] Transaction of goods can have Amount and Currency, like transfer Goods with a fee
- [-] Seed: TODO: MUST SUM or CREDIT OUTPUT_ID with AMOUNT of goods transfer

- [-] create couchdb indexes
- [-] "error": "Just the government (participant with id gov) can create people"
- [-] in a near future we must move goods to its own table, else entities are start to grow with many items in goodsStock

- [-] test a big array of goods,to test transaction limit
- [-] credit and debit goods, with protections to not debit if balance is less than zero or quantity to debit is greater than balance
- [-] if barCode exists but not code use code = barCode
- [-] protection to check if sent duplicated codes in goods, if it occurs it will inc/dec more than one time the same code
- error if we have 4 items, and remove on it simply clears the missing ond in goodsInput

add type to person to cause new, even is always a person is more clear for all
  "data": {
    "causeNew": {
      "id": "8fd03aaf-49f1-47f3-88d8-ae78af4971fa",
      "name": "NewCause#07 [8fd03aaf]",
      "input": {
        "entity": {
          "id": "c8ca045c-9d1b-407f-b9ae-31711758f2d0"
        }

remove from models

add validation to goods models, ex barcode

must init 
fundsBalance
volunteeringHoursBalance
goods
objects
// init objects
participant.fundsBalance = new GenericBalance();
participant.volunteeringHoursBalance = new GenericBalance();
participant.goodsStock = new Array<Goods>()

- [-] goods validation
- [-] cc protections for empty array of goods, miss quantity and other required fields on itens in array, try use Goods and GraqphQL validation FIRST is required fields
- [- ] create function check if good exists in entity, and if not create, aiexists increment credit and balance 