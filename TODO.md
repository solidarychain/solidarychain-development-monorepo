# ToDo

## Chaincode's

- [-] getAll must have pagination, with some limits
- [-] receive hyperledger events
- [-] upsert person with citizenCard data, ex when person is registred only with fiscalNumber for ex
- [-] change profile > username, password, email, phone, mobilePhone, district, coordinates, reputation(object), personalInfo
- [X] `packages/server-graphql/src/participant/models/x509Identities.model.ts` to `packages/server-graphql/src/common/models`
- [X] protection only ambassadors can transfer goods, money or assets from participants and causes to other entities
- [X] remove ambassadors when we transfer asset, else we leave some ambassadors behind
- [X] add email to participants and causes
- [X] convert all currencies to EUR before add to ledger, store original currency and exchange rate used ex currencyOrg: USD, quantityOrg: 1.45, exchangeRate: 1.12
  - [-] currently require to transfer EUR else fails, in a near future we start to work with exchange rates
- [X] protection to transfer amount's, for now we don't have access to entity wallets balance, we only balance what is ttransfer in plataform, values canc have negative balances, no problem
- [-] update
  - [-] participant: (permissions frontend with gov wallet, and a ambassador logged)
  - [-] person: (permissions frontend with gov wallet, or android app)
  - [-] cause: (permissions cause creator/owner or ambassador)
  - [-] asset: add/remove ambassadors add by NIF/FiscalNumber (permissions owner or ambassador)

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
    [ ] changeIdentity /working but must have a user with wallet and abac / attributes ADMIN
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

## Neo4J / GraphQL Data Layer

- [] receive transaction id, to store in neo4j, with block id

## Todo: NOTES and README

- [-] Finish `packages/server-rest/README.md`
- [X] Protect from create Person with same username, fiscalNumber and Id
- [X] create user only with fiscalNumber

## InfraStructure: Servers

- [ ] GENERATE solidary.network and solidarychain.com let's encrypt certificates
- [ ] use certificates in graphql api server, and react frontend

## React FrontEnd

- [-] Clean state after logout
- [-] On enter page Refresh token....console errrors

--------------------------------------------------------------------------------------------------------------------------------------------------------------

- [X] add common function `checkValidPersons` to common to not have circular dependencies and use it Participants and Transactions, in participants are comment `// TODO: enable again`
- [X] create a common function in common to get loggedPerson model from richQuery, this way we don't have circular dependencies `const loggedPerson: Person = await Person.getById(transaction.loggedPersonId);`
- [X] Get Rid of all getOne(id)
- [X] get all username, id and roles in all controllers (shared function), and add use it it in `transaction.createdByPersonId = transaction.loggedPersonId;`
- [X] Add createdByPersonId to all models
- [X] edit all models, add ambassadors to cause and participants, and asset todo
- [X] Remove owner from ambassador array, is used, NOT NEED
- [-] finish transfers when are one of the ambassadors in asset, cause and participant


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

- [ ] upsert Person with NIF with extended citizenCard data
- [ ] Update Models, add subscription to all models
  - [ ] Add updatedByPersonId to all models
  - [ ] Add updatedDate to all models

improve transferes, to use all modes

add the 9 transfer types to seed
person > person
person > participant
person > cause
participant > person
participant > participant
participant > cause
cause > person
cause > participant
cause > cause

protections
- [-] asset: only ambassador or OWNER can transfer resources from causes to ENTITIES
- [-] cause : only ambassador can transfer resources from causes to ENTITIES
- [-] participant : only ambassador can transfer resources from participant to ENTITIES

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

add validation to goods models, ex barCode

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

--------------------------------------------------------------------------------------------------------------------------------------------------------------

2020-05-05 22:59:44

- [-] entity(a) to entity(b)
  - a decrement its goodsStock
  - b increment its goodsStock

--------------------------------------------------------------------------------------------------------------------------------------------------------------

2020-05-06 11:51:34

running in debug mode error#1

Error: Failed to load gRPC binary module because it was not installed for the current system
Expected directory: node-v64-linux-x64-glibc
Found: [node-v59-linux-x64-glibc]
This problem can often be fixed by running "npm rebuild" on the current system
Original error: Cannot find module '/media/mario/Storage/Documents/Development/@Solidary.Network/solidarynetwork-development-monorepo/chaincode-solidary-network-chaincode/node_modules/fabric-shim/node_modules/grpc/src/node/extension_binary/node-v64-linux-x64-glibc/grpc_node.node'

$ cd /media/mario/Storage/Documents/Development/@Solidary.Network/solidarynetwork-development-monorepo/chaincode-solidary-network-chaincode/node_modules/fabric-shim/
$ npm rebuild

fixs it? YES move to fixes

--------------------------------------------------------------------------------------------------------------------------------------------------------------

2020-05-06 11:51:43

running in debug mode error#2
npm WARN @worldsibu/convector-adapter-fabric@1.3.8 requires a peer of fabric-ca-client@>=1.1.2 but none is installed. You must install peer dependencies yourself.

$ ls node_modules/@worldsibu/convector-adapter-fabric -la
total 24
drwxrwxr-x  2 mario mario  4096 May  6 10:51 .
drwxrwxr-x 18 mario mario  4096 May  6 11:51 ..
-rw-rw-r--  1 mario mario 11566 May  4 01:49 LICENSE.txt
-rw-rw-r--  1 mario mario  2816 May  4 01:49 package.json

EMPTY PACKAGE?

won't work
ADD_PACKAGE=@worldsibu/convector-adapter-fabric@1.3.8
TO_PACKAGE=@solidary-network/server-graphql
npx lerna add ${ADD_PACKAGE} --scope ${TO_PACKAGE}

fix 

$ cp /tmp/foo/node_modules/@worldsibu/convector-adapter-
fabric/dist/ node_modules/@worldsibu/convector-adapter-fabric/ -r

$ npm rebuild

done

--------------------------------------------------------------------------------------------------------------------------------------------------------------

npm i
../../node_modules/jest-diff/build/diffLines.d.ts:8:34 - error TS1005: ';' expected.
8 import type { DiffOptions } from './types';
fix :https://github.com/facebook/jest/issues/9703
$ tsc -v
Version 3.4.5
It looks like you need typescript > 3.8.0
$ npx tsc --version
Version 3.8.3

remove
		"@types/jest-diff": {
			"version": "24.3.0",
			"resolved": "https://registry.npmjs.org/@types/jest-diff/-/jest-diff-24.3.0.tgz",
			"integrity": "sha512-vx1CRDeDUwQ0Pc7v+hS61O1ETA81kD04IMEC0hS1kPyVtHDdZrokAvpF7MT9VI/fVSzicelUZNCepDvhRV1PeA==",
			"requires": {
				"jest-diff": "*"
			}
		},
from
/media/mario/Storage/Documents/Development/@Solidary.Network/solidarynetwork-development-monorepo/package-lock.json

and to finish

npm i 

fixed

--------------------------------------------------------------------------------------------------------------------------------------------------------------

2020-05-06 12:55:22

npm run cc:start:debug -- ${CHAINCODE_NAME}

Original error: Cannot find module '/media/mario/Storage/Documents/Development/@Solidary.Network/solidarynetwork-development-monorepo/chaincode-solidary-network-chaincode/node_modules/fabric-shim/node_modules/grpc/src/node/extension_binary/node-v57-linux-x64-glibc/grpc_node.node'

npm rebuild

fixed, but no way to stop at breakpoints yet

FIX BREAKPOINT

ending ERROR message back to peer  
(node:25900) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 uncaughtException listeners added. Use emitter.setMaxListeners() to increase limit
Found config in package [ { name: '@solidary-network/common-cc',


$ npm run env:restart

> @solidary-network/lerna-monorepo@0.1.0 env:restart /tmp/sn/solidarynetwork-development-monorepo
> hurl new

/usr/local/lib/node_modules/@worldsibu/hurley/node_modules/grpc/src/grpc_extension.js:55
    throw error;
    ^



- [] in // protection valid stock balance, check if casue or participant have stock


move 

check script `copy:indexes`

couchdb/indexes/name-json-index.json
couchdb/indexes/quantity-json-index.json
couchdb/indexes/username-json-index.json

to ./indexes

--------------------------------------------------------------------------------------------------------------------------------------------------------------

