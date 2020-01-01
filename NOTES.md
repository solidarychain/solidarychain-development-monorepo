# NOTES : Warning : Internal notes, subject to errors and typos

- [NOTES : Warning : Internal notes, subject to errors and typos](#notes--warning--internal-notes-subject-to-errors-and-typos)
  - [Links Used](#links-used)
    - [WorldSibu](#worldsibu)
    - [Medium](#medium)
    - [Nest Js](#nest-js)
  - [Commands](#commands)
  - [Fix's](#fixs)
  - [Uris and Endpoints](#uris-and-endpoints)
    - [Tools](#tools)
    - [Mango Queries](#mango-queries)
    - [Endpoints](#endpoints)
  - [Fix's](#fixs-1)
  - [Clone Worldsibu Repository](#clone-worldsibu-repository)
  - [Config environment](#config-environment)
  - [Install/Update Tooling](#installupdate-tooling)
  - [SetUp](#setup)
  - [What are we going to build?](#what-are-we-going-to-build)
    - [Here is a brief explanation of what it is done in the smart contract tutorial](#here-is-a-brief-explanation-of-what-it-is-done-in-the-smart-contract-tutorial)
      - [Each data structure is defined as](#each-data-structure-is-defined-as)
      - [Business rules](#business-rules)
      - [The flow should look like this](#the-flow-should-look-like-this)
  - [Start Code It: Modules, Controllers and Services](#start-code-it-modules-controllers-and-services)
  - [Config/ Environment](#config-environment)
  - [Create files](#create-files)
  - [Run Convector and Test](#run-convector-and-test)
  - [Extend tutorial](#extend-tutorial)
    - [Commit project](#commit-project)
    - [add Types to Participant and Person Modules and Use it [DEPRECATED]](#add-types-to-participant-and-person-modules-and-use-it-deprecated)
    - [To Use CouchDB and don't DRY Initialization block in Controllers](#to-use-couchdb-and-dont-dry-initialization-block-in-controllers)
    - [Couch Views (Require to add to all nodes fabric-couchdb/ couchdb.peer0.org?.hurley.lab)](#couch-views-require-to-add-to-all-nodes-fabric-couchdb-couchdbpeer0orghurleylab)
  - [Fire All Requests](#fire-all-requests)
  - [Test/Jest](#testjest)
    - [Error 1](#error-1)
    - [error 3](#error-3)
  - [Implement Swagger Docs](#implement-swagger-docs)
    - [Install dependencies](#install-dependencies)
    - [Initialize the Swagger using SwaggerModule](#initialize-the-swagger-using-swaggermodule)
    - [Redirect root to Api](#redirect-root-to-api)
    - [Test Swagger Api and Redirect](#test-swagger-api-and-redirect)
    - [Create Swagger DTO's](#create-swagger-dtos)
    - [Global constant file](#global-constant-file)
    - [Swagger : @ApiResponse decorators](#swagger--apiresponse-decorators)
  - [Add HTTPS to Server](#add-https-to-server)
    - [Add Redirect Middleware (HTTP to HTTPS)](#add-redirect-middleware-http-to-https)
    - [Test Https and HTTP to HTTPS Redirect](#test-https-and-http-to-https-redirect)
    - [Enable CORS](#enable-cors)
  - [Authentication](#authentication)
    - [Authentication: Implementing Passport local](#authentication-implementing-passport-local)
    - [Authentication: Built-in Passport Guards](#authentication-built-in-passport-guards)
    - [Authentication: JWT functionality](#authentication-jwt-functionality)
    - [Authentication: Implementing Passport JWT](#authentication-implementing-passport-jwt)
    - [Authentication: Implement protected route and JWT strategy guards](#authentication-implement-protected-route-and-jwt-strategy-guards)
    - [Authentication: Default strategy](#authentication-default-strategy)
    - [Authentication: Guards, BearerAuth and Response decorators](#authentication-guards-bearerauth-and-response-decorators)
    - [Authentication: Finish App controller Login and Profile routes](#authentication-finish-app-controller-login-and-profile-routes)
    - [Authentication: Test Swagger With Authentication](#authentication-test-swagger-with-authentication)
  - [Change/Extend Person model to have authorization credentials](#changeextend-person-model-to-have-authorization-credentials)
  - [Renew and Deploy new upgraded ChainCode after chaincode model Changes](#renew-and-deploy-new-upgraded-chaincode-after-chaincode-model-changes)
  - [Start to encrypt passwords with BCrypt](#start-to-encrypt-passwords-with-bcrypt)
  - [Create common Package to share stuff @convector-rest-sample/common](#create-common-package-to-share-stuff-convector-rest-samplecommon)
    - [Create lerna common package @convector-rest-sample/common](#create-lerna-common-package-convector-rest-samplecommon)
    - [Use common package inside ChainCode](#use-common-package-inside-chaincode)
    - [Use scripts to copy other files to chaincode](#use-scripts-to-copy-other-files-to-chaincode)
    - [Clean Up](#clean-up)
  - [Implement UsersService with ledger Persons/Users authentication](#implement-usersservice-with-ledger-personsusers-authentication)
  - [Clean up and solve problem of @babel/.highlight.DELETE@latest when use lerna bootstrap](#clean-up-and-solve-problem-of-babelhighlightdeletelatest-when-use-lerna-bootstrap)
  - [Solve custom nestjs packages dependencies](#solve-custom-nestjs-packages-dependencies)

This is a simple NestJs starter, based on above links, I only extended it with a few things like **swagger api**, **https**, **jwt**, and other stuff, thanks m8s

> IMPORTANT NOTE: node version used `v8.16.0` without issues

## Links Used

### WorldSibu

- [WorldSibu Awesome Convector Suite](https://worldsibu.tech/about/)
- [WorldSibu Awesome Convector Suite : Tutorial - Getting Started](https://docs.worldsibu.com/article/99-tutorial-getting-started)

### Medium

- [Convector with NestJS](https://medium.com/swlh/convector-with-nestjs-7e660322d927)
- [Final Example](https://github.com/mahcr/convector-example-people-attributes)

### Nest Js

- [NestJS Swagger](https://docs.nestjs.com/recipes/swagger)
- [NestJS HTTPS](https://docs.nestjs.com/faq/multiple-servers)

## Commands

```shell
# run test
$ npm test

# lift hyperledger
$ npm run env:restart

# deploy smart contract (this smart contract have person and participant packages deployed in one unified chaincode)
$ npm run cc:start -- person

# build person-cc or participant-cc (before upgrade person chaincode)
$ npx lerna run build --scope @convector-sample/person-cc
$ npx lerna run build --scope @convector-sample/participant-cc
# upgrade smart contract
$ npm run cc:upgrade -- person 1.3
# note: after deploy/upgrade wait a few second/minutes in first invoke,
# when done we have a new container and command end with result `Upgraded Chaincode at org1`
# watch for deployed container
$ watch "docker container ls --format "{{.Names}}" | grep \"person\""
dev-peer0.org2.hurley.lab-person-1.0
dev-peer0.org1.hurley.lab-person-1.0

# package chain code: force build chaincode-person folders
$ npm run cc:package -- person org1

# after restart hyperledger always seed ledger
$ npm run seed
# or
$ ./seed.sh
# after restart hyperledger always create views
$ ./views/install.sh

# debug chain code (remember breakpoint are set in .js no ts files)
$ npm run cc:start:debug -- person
# if error occur use target debug version, recommend to always use version
$ npm run cc:start:debug -- person 1.1

# run dev server
$ npx lerna run start:dev --scope @convector-sample/server-rest --stream
# run debug server
$ npx lerna run start:debug --scope @convector-sample/server-rest --stream

# invoke some stuff (after deploy or upgrade chaincode)
$ npx hurl invoke person person_get 1-100-100
$ npx hurl invoke person participant_get gov

# debug/view logs container person-1.0, person-1.1...
$ CHAINCODE="person"
$ sudo docker container ls | grep ${CHAINCODE} | awk '{print $1" : "$2}'
f544509eec58 : dev-peer0.org2.hurley.lab-person-1.0-351b0bef3757230f476dec587f92b0d6ec2d60224e983cc32119aafec151bcdd
32ebfd14677d : dev-peer0.org1.hurley.lab-person-1.0-327a0dd6d92274526a6230611433ce88bc56a5602b3f6036cd5f739662e1d1f5
# or
$ docker container ls --format "{{.ID}}\t{{.Image}}"
# with chaincode version
$ CHAINCODE_VERSION="1.0"
$ SEARCH_CONTAINER="${CHAINCODE}-${CHAINCODE_VERSION}"
$ sudo docker logs $(docker container ls | grep ${SEARCH_CONTAINER} | awk '{print $1}' | head -n 1) -f
```

## Fix's

```shell
# when running server, when we build chaincode, we must stop and start server
@convector-sample/server-graphql: src/convector.ts(35,50): error TS2339: Property 'get' does not exist on type 'ConvectorControllerClient<ConvectorController<any>>'.
@convector-sample/server-graphql: src/participant/participant.service.ts(13,42): error TS2339: Property 'register' does not exist on type 'ConvectorControllerClient<ConvectorController<any>>'.
@convector-sample/server-graphql: src/participant/participant.service.ts(23,75): error TS2339: Property 'get' does not exist on type 'ConvectorControllerClient<ConvectorController<any>>'.
@convector-sample/server-graphql: src/participant/participant.service.ts(35,105): error TS2339: Property 'getAll' does not exist on type 'ConvectorControllerClient<ConvectorController<any>>'.
@convector-sample/server-graphql: 20:58:05 - Found 4 errors. Watching for file changes.
# fix build cc's and start server
$ npx lerna run build --scope @convector-sample/person-cc --stream
$ npx lerna run build --scope @convector-sample/participant-cc --stream
$ npx lerna run start:debug --scope @convector-sample/server-rest --stream
```

## Uris and Endpoints

### Tools

- [Fauxton](http://localhost:5084/_utils/#database/)

### Mango Queries

> Use double quotes in fauxton else silent error, does nothing, or copy some values from result sets

```json
{
  "selector": {
    "type": "io.worldsibu.examples.participant",
    "identities": {
      "$elemMatch": {
        "fingerprint": "C8:B1:6A:5D:67:77:44:99:C6:3F:59:7C:1D:A5:F1:29:40:AE:5B:C9",
        "status": true
      }
    }
  }
}
```

```json
{
  "selector": {
    "type": "io.worldsibu.examples.person",
    "attributes": {
      "$elemMatch": {
        "id": "born-year",
        "content": {
          "data": "1971"
        }
      }
    }
  }
}
```

### Endpoints

- <http://localhost:3000/participant/>
- <http://localhost:3000/person/>

## Fix's

if have problems after install packages with `lerna add` and with chaincodes, ex with `lerna bootstrap`
and have error not found chaincode package on npm registry like `'participant-cc@^0.1.0' is not in the npm registry`, just rebuild chaincode, and next `lerna bootstrap`

```shell
$ npx lerna run build --scope @convector-sample/participant-cc
lerna success run Ran npm script 'build' in 1 package in 3.2s:
lerna success - participant-cc
$ npx lerna bootstrap
```

## Clone Worldsibu Repository

```shell
# clone repo
$ git clone https://github.com/worldsibu/convector-example-people-attributes.git
$ cd convector-example-people-attributes
```

## Config environment

`.vscode/settings.json`

```json
{
  "files.exclude": {
    "**/node_modules/": true,
    // The following will hide the js and map files in the editor
    "**/*.js": true,
    "**/*.map": true
  }
}
```

`.vscode/launch.json`

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach to Backend Server",
      "port": 9222,
      "sourceMaps": true,
      "trace" : true
    },
    {
      "type": "node",
      "request": "attach",
      "name": "Attach to Chaincode",
      "port": 9990,
      "sourceMaps": true,
      "trace" : true
    }
  ]
}
```

## Install/Update Tooling

check versions

```shell
$ hurl --version
1.0.5
$ nest --version
6.5.0
$ node --version
v8.16.0
```

> Note: tried first with `node/v11.10.0` but gives some errors with `node-gyp`, changed to `node/v8.16.0` with nvh and everything works with `npm i`

## SetUp

1. Install/Update Hurley which will help us to set up a testing network `sudo npm i -g @worldsibu/hurley`

2. Install/Update the NestJS CLI by running `npm install -g @nestjs/cli`

3. Recreate repo with `rm .git -r && git init`

4. Run `rm -rf ./packages/server-rest` to delete Express App.

5. Edit `.gitignore`

6. Move to the package folder run `cd packages && nest new server && cd ..`. This is going to scaffold a NestJS project for you.

7. Install `env-cmd` with lerna for handle environmental variables `npx lerna add env-cmd --dev --scope @convector-sample/server-rest --no-bootstrap`

8. Install the smart contract packages that are going to be consumed by NestJS

```shell
$ npx lerna add participant-cc --scope @convector-sample/server-rest --no-bootstrap
$ npx lerna add person-cc --scope @convector-sample/server-rest --no-bootstrap
```

> To avoid typing conflicts add the `skipLibCheck` flag in the `root` and `server` `tsconfig` files.
> (There is a problem between Jest used by NestJS and Mocha used by Convector)

9. And lastly `npm install`

10. Commit project with `git add . && git commit -am "first commit"`

## What are we going to build?

We’re going to re-use the **two smart contracts** that were created in the smart-contract tutorial and expose them through endpoints using NestJS.

### Here is a brief explanation of what it is done in the smart contract tutorial

There are three data structures in the blockchain: **Network Participants, Attribute and Person**.

#### Each data structure is defined as

- **Network Participants**: These are the companies issuing attributes in the network. They are responsible for what they state for users and are identifiable in the network.
- **Attribute**: It’s the statement that a Network Participant certifies for a Person.
- **Person**: These are the people representation in the network. They have attributes assigned and can simply query them as needed to certify in front of a third party.

#### Business rules

- Create a person should be responsibility of just one organization — the government.
- Each organization (network participant) should be able to issue or certify attributes.
- Each organization (network participant) should be able to check/query attributes from a person.
- A single ID should be enough to query all the information related to one person and his attributes.
- Only the organization that certifies an attribute can edit it.

#### The flow should look like this

- The government can “enroll” a new person.
- The government can add some attributes to that person by default.
- Then, other organizations can start to issue attributes (profession, insurance status, work experience).
- Every change in the attributes issued will be evident. Changes on attributes can only be performed by the organization that issued them in the first place.

Let take a look to the following example to understand better:

Assume that a network participant is the **government**, a person is you and an attribute your born certificate.
The government is in charge of **registering your birth day and issue a born certificate** that you’ll store.
But for some reason your name have a typo (I’m sorry for you 😂) in the certificate and only the county court (another network participant that is not the government) can help you. The county court can **fix your name but not create another person**.

## Start Code It: Modules, Controllers and Services

```shell
# enter nestjs dir
cd packages/server-rest
# create the participant module and register it in the app module automatically.
$ nest generate module participant
```

> Every command run using the Nest CLI is going to automatically register the feature (provider, module, pipe, etc) to the **scope module** if it exists otherwise it will be added to the app module.

```shell
# create the controller:
$ nest generate controller participant
$ nest generate service participant
```

we can see that `ParticipantController` was added to `ParticipantModule` (scope module)

```typescript
@Module({
  controllers: [ParticipantController]
})
```

Let’s do very quick the same for person but this time we’re going to create a service for this module:

```shell
$ nest generate module person
$ nest generate controller person
$ nest generate service person
```

## Config/ Environment

create two files in `src` folder: `env.ts` and `convector.ts`

config package.json to use `env-cmd -f .env`

```json
"start": "env-cmd -f .env ...",
"start:dev": "env-cmd -f .env...",
"start:debug": "env-cmd -f .env ...",
"start:prod": "env-cmd -f .env ...",
```

create `packages/server-rest/.env` with

```config
PORT=3000
```

add `.env` to `.gitignore` with `echo packages/server-rest/.env >> .gitignore`

Now, what we need to do is start migrating the logic. All the code related to the communication with convector and any other heavy calculation to our services and the controllers are going to be in charge of exposing the endpoints and pass down the data to the services.

## Create files

- `packages/server-rest/src/participant/participant.controller.ts`
- `packages/server-rest/src/participant/participant.service.ts`
- `packages/server-rest/src/person/person.controller.ts`

## Run Convector and Test

Let’s run the same commands used in the back-end tutorial:

1. Make sure that Docker is running.
2. Go to the root and run:

```shell
# Start a local blockchain
$ npm run env:restart
[hurley] - Ran network restart script
[hurley] - ************ Success!
[hurley] - Complete network deployed at /home/mario/hyperledger-fabric-network
[hurley] - Setup:
        - Organizations: 2
            * org1
            * org2
        - Users per organization: user1
            * admin
            * user1
        - Channels deployed: 1
            * ch1

[hurley] - You can find the network topology (ports, names) here: /home/mario/hyperledger-fabric-network/docker-compose.yaml

# log fabric orderer container
CONTAINER_ID=$(docker ps | awk '/hyperledger\/fabric-orderer/ { print $1 }')
$ sudo docker container logs -f $CONTAINER_ID

# install the chaincode
$ npm run cc:start -- person
Instantiated Chaincode at org1

# start your web server
$ npx lerna run start:dev --scope @convector-sample/server-rest --stream

# seed some participants, in first invoke wait some seconds more
$ npx hurl invoke person participant_register gov "Big Government" -u admin
$ npx hurl invoke person participant_register mit "MIT" -u user1 -o org1
$ npx hurl invoke person participant_register naba "National Bank" -u user1 -o org2

# test endpoints
$ curl http://localhost:3000/participant/gov
{"_id":"gov","_identities":[{"fingerprint":"81:C9:69:95:9E:12:BE:5A:98:DE:10:3B:4A:8B:80:03:9F:3E:33:E6","status":true}],"_msp":"org1MSP","_name":"Big Government","_type":"io.worldsibu.examples.participant"}

$ curl http://localhost:3000/participant/mit
{"_id":"mit","_identities":[{"fingerprint":"6F:8E:B9:AF:1E:32:E7:9F:53:8D:28:07:79:0F:9D:39:D1:62:08:45","status":true}],"_msp":"org1MSP","_name":"MIT","_type":"io.worldsibu.examples.participant"}

# run a few transactions

# Add a new person
$ curl -H "Content-Type: application/json" --request POST --data '{ "id":"1-00200-2222-1", "name":"John Doe" }' http://localhost:3000/person
{"type":"Buffer","data":[]}

# Add a new attribute
$ curl -H "Content-Type: application/json" --request POST --data '{ "attributeId":"birth-year", "content": 1993 }' http://localhost:3000/person/1-00200-2222-1/add-attribute
{"id":"1-00200-2222-1","type":"io.worldsibu.person","name":"John Doe","attributes":[{"certifierID":"gov","content":1993,"id":"birth-year","issuedDate":1565561317567,"type":"io.worldsibu.examples.attribute"}]}

# orderer logs
2019-08-11 21:54:02.746 UTC [comm.grpc.server] 1 -> INFO 015 streaming call completed {"grpc.start_time": "2019-08-11T21:54:02.738Z", "grpc.service": "orderer.AtomicBroadcast", "grpc.method": "Broadcast", "grpc.peer_address": "172.23.0.1:45590", "grpc.code": "OK", "grpc.call_duration": "8.294983ms"}
2019-08-11 21:55:04.935 UTC [comm.grpc.server] 1 -> INFO 016 streaming call completed {"grpc.start_time": "2019-08-11T21:55:04.931Z", "grpc.service": "orderer.AtomicBroadcast", "grpc.method": "Broadcast", "grpc.peer_address": "172.23.0.1:45890", "grpc.code": "OK", "grpc.call_duration": "4.081646ms"}
2019-08-11 21:55:37.822 UTC [comm.grpc.server] 1 -> INFO 017 streaming call completed {"grpc.start_time": "2019-08-11T21:55:37.817Z", "grpc.service": "orderer.AtomicBroadcast", "grpc.method": "Broadcast", "grpc.peer_address": "172.23.0.1:46062", "grpc.code": "OK", "grpc.call_duration": "4.932098ms"}
```

## Extend tutorial

### Commit project

```shell
$ git add . && git commit -am "finished tutorial"
```

### add Types to `Participant` and `Person` Modules and Use it [DEPRECATED]

- `packages/server-rest/src/participant/types/participant.ts`
- `packages/server-rest/src/participant/types/index.ts`
- `packages/server-rest/src/person/types/index.ts`
- `packages/server-rest/src/person/types/person.ts`

### To Use CouchDB and don't DRY Initialization block in Controllers

1. Create `initCouchDB` in `AppService` and add it to `constructor` this way it will be re-used in all controllers without any further changes

```typescript
@Injectable()
export class AppService {

  constructor() {
    // init CouchDB before use it
    this.initCouchDB();
  }

  initCouchDB() {
    BaseStorage.current = new CouchDBStorage({
      host: couchDBHost,
      protocol: couchDBProtocol,
      port: couchDBPort,
    }, e.couchDBView);
  }
}
```

### Couch Views (Require to add to all nodes fabric-couchdb/ couchdb.peer0.org?.hurley.lab)

```shell
$ ./views/install.sh
Installing template views
{"ok":true,"id":"_design/person","rev":"1-a1afaedf5e49e4f592a3089e599b0f8f"}
Installed template views
```

## Fire All Requests

```shell
# create participant (chain)
$ npx hurl invoke person participant_register red "Red Cross"
$ curl -X POST \
  http://localhost:3000/participant \
  -H 'Content-Type: application/json' \
  -d '{
    "id":"red",
    "name": "Red Cross"
  }'
# get participant person (chain)
$ npx hurl invoke person participant_get red
$ curl http://localhost:3000/participant/red | jq

# create person (chain) : REQUIRED to use admin user (belongs to org1/gov)
$ npx hurl invoke person person_create '{"id":"1-100-104", "name": "1-100-104"}' -u admin
$ curl -X POST \
  http://localhost:3000/person \
  -H 'Content-Type: application/json' \
  -d '{
    "id":"1-100-104",
    "name": "Jane Doe"
  }'

# get person (chain)
$ npx hurl invoke person person_get 1-100-103
$ curl http://localhost:3000/person/1-100-103 | jq

# get all persons (worldState/couchdb)
$ npx hurl invoke person person_getAll
$ curl http://localhost:3000/person | jq

# addAttribute
$ npx hurl invoke person person_addAttribute 1-100-103 '{"id": "birth-year", "certifierID": "gov", "content": "1993", "issuedDate": 1554239270 }' -u admin
$ curl -X POST \
  http://localhost:3000/person/1-100-103/add-attribute \
  -H 'Content-Type: application/json' \
  -d '{
    "attributeId":"birth-year",
    "content": "1971"
  }' | jq

# getByAttribute
$ npx hurl invoke person person_getByAttribute birth-year 1971
$ curl -X POST \
  http://localhost:3000/person/birth-year/get-attribute \
  -H 'Content-Type: application/json' \
  -d '{
    "value": "1971"
  }' | jq
```

## Test/Jest

fix errors

### Error 1

```
FAIL  src/participant/participant.controller.spec.ts
● Test suite failed to run

Cannot find module './build/Release/x509' from 'index.js'

However, Jest was able to find:
    'build/Release/x509.node'

You might want to include a file extension in your import, or update your 'moduleFileExtensions', which is currently ['js', 'json', 'ts'].
```

add `"node"` to `packages/server-rest/package.json`

```json
"jest": {
  "moduleFileExtensions": [
    "js",
    "json",
    "ts",
    "node"
  ]
```

### error 3

```
FAIL  src/person/person.controller.spec.ts
● Person Controller › should be defined

  Nest can't resolve dependencies of the PersonController (?). Please make sure that the argument at index [0] is available in the _RootTestModule context.

    at Injector.lookupComponentInExports (../../../node_modules/@nestjs/core/injector/injector.js:183:19)

● Person Controller › should be defined

  expect(received).toBeDefined()

  Received: undefined

    14 |
    15 |   it('should be defined', () => {
  > 16 |     expect(controller).toBeDefined();
        |                        ^
    17 |   });
    18 | });
    19 |

    at Object.it (person/person.controller.spec.ts:16:24)
```

Fix: was adding missing `providers: [PersonService]` on `packages/server-rest/src/person/person.controller.spec.ts`

```typescript
beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [PersonController],
    providers: [PersonService],
  }).compile();

  controller = module.get<PersonController>(PersonController);
});
```

## Implement Swagger Docs

### Install dependencies

```shell
# install the required packages
$ npx lerna add @nestjs/swagger --scope @convector-sample/server-rest --no-bootstrap
$ npx lerna add swagger-ui-express --scope @convector-sample/server-rest --no-bootstrap
# required for models
$ npx lerna add class-validator --scope @convector-sample/server-rest --no-bootstrap
$ npx lerna add class-transformer --scope @convector-sample/server-rest --no-bootstrap
$ npx lerna bootstrap
```

### Initialize the Swagger using SwaggerModule

- [Nest.JS OpenAPI (Swagger)](https://docs.nestjs.com/recipes/swagger)

add to `packages/server-rest/src/env.ts`

```typescript
  ...
  // swaggerModule
  swaggerModuleTitle: process.env.SWAGGER_MODULE_TITLE || 'Person ChainCode',
  swaggerModuleDescription: process.env.SWAGGER_MODULE_DESCRIPTION || 'Convector Person ChainCode API',
  swaggerModuleVersion: process.env.SWAGGER_MODULE_VERSION || '1.0',
  swaggerApiPath: process.env.SWAGGER_API_PATH || 'api',
  swaggerModuleTagAuth: process.env.SWAGGER_MODULE_TAG_AUTH || 'auth',
  swaggerModuleTagPerson: process.env.SWAGGER_MODULE_TAG_PERSON || 'person',
  swaggerModuleTagParticipant: process.env.SWAGGER_MODULE_TAG_PERSON || 'participant',
};
```

add to `packages/server-rest/src/main.ts`

```typescript
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
...
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // initialize SwaggerModule
  const options = new DocumentBuilder()
    .setTitle(e.swaggerModuleTitle)
    .setDescription(e.swaggerModuleDescription)
    // .addTag('person')
    .addTag(`${e.swaggerApiPath}/${e.swaggerModuleTagPerson}`)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(e.swaggerApiPath, app, document);

  await app.listen(3000);
}
...
```

### Redirect root to Api

change default `@Get` controller in `packages/server-rest/src/app.controller.ts` to

```typescript
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiExcludeEndpoint()
  redirectToApi(@Res() response: express.Response) {
    response.redirect(e.swaggerApiPath, HttpStatus.PERMANENT_REDIRECT);
  }
}
```

### Test Swagger Api and Redirect

```shell
# boot server and test api docs
$ npx lerna run start:dev --scope @convector-sample/server-rest --stream
```

open your browser and navigate to <http://localhost:3000/api/>
to download swagger JSON file, fire request to <http://localhost:3000/api-json>
test redirect navigate to <http://localhost:3000> this will redirect to <http://localhost:3000/api/>

### Create Swagger DTO's

now we need to create model/DTO's for all endpoints that have `@Body`

`packages/server-rest/src/participant/dto/register-participant.dto.ts`

```typescript
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterParticipantDto {
  @ApiModelProperty()
  @IsString()
  readonly id: string;

  @ApiModelProperty()
  @IsString()
  readonly name: string;
}
```

`packages/server-rest/src/person/dto/add-person-attribute.dto.ts`

```typescript
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddPersonAttributeDto {
  @ApiModelProperty()
  @IsString()
  readonly attributeId: string;

  @ApiModelProperty()
  readonly content: any;
}
```

`packages/server-rest/src/person/dto/create-person.dto.ts`

```typescript
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePersonDto {
  @ApiModelProperty()
  @IsString()
  readonly id: string;

  @ApiModelProperty()
  @IsString()
  readonly name: string;
}
```

`packages/server-rest/src/person/dto/get-person-by-attribute.dto.ts`

```typescript
import { ApiModelProperty } from '@nestjs/swagger';

export class GetPersonByAttributeDto {
  @ApiModelProperty()
  readonly value: any;
}
```

now replace json objects ex { id, name } with DTO's

`packages/server-rest/src/participant/participant.controller.ts`

```typescript
import { RegisterParticipantDto } from './dto';
...
@Post()
public async register(@Body() participantDto: RegisterParticipantDto): Promise<void> {
  try {
    return await ParticipantControllerBackEnd.register(participantDto.id, participantDto.name);
  } catch (err) {
    Logger.error(JSON.stringify(err));
    throw new HttpException(`Bad request: ${err.message}`, HttpStatus.BAD_REQUEST);
  }
}
```

`packages/server-rest/src/person/person.controller.ts`

```typescript
@Post('/')
public async create(@Body() createPersonDto: CreatePersonDto) {
  try {
    return this.personService.create(createPersonDto.id, createPersonDto.name);
  } catch (err) {
    Logger.error(JSON.stringify(err));
    const message: string = (err.responses[0]) ? err.responses[0].error.message : 'Internal';
    throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

@Post('/:id/add-attribute')
public async addAttribute(@Param() { id }, @Body() addPersonAttributeDto: AddPersonAttributeDto) {
  try {
    return this.personService.addAttribute(id, addPersonAttributeDto.attributeId, addPersonAttributeDto.content);
  } catch (err) {
    Logger.error(JSON.stringify(err));
    throw new HttpException('Internal', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

@Post('/:id/get-attribute')
public async getByAttribute(@Param() { id }, @Body() getPersonByAttributeDto: GetPersonByAttributeDto) {
  try {
    return this.personService.getByAttribute(id, getPersonByAttributeDto.value);
  } catch (err) {
    Logger.error(JSON.stringify(err));
    throw new HttpException('Internal', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
```

### Global constant file

create a `packages/server-rest/src/constants.ts` file to prevent DRY/hard-code strings

ex

```typescript
// api : https status
const API_RESPONSE_BAD_REQUEST: string = 'Bad Request';
const API_RESPONSE_CREATED: string = 'The record has been successfully created';
const API_RESPONSE_INTERNAL_SERVER_ERROR: string = 'Internal server error';
...
```

> Note: view source code files

### Swagger : @ApiResponse decorators

add `packages/server-rest/src/participant/participant.controller.ts` and `packages/server-rest/src/person/person.controller.ts`

ex

```typescript
  @Get()
  @ApiOperation({ title: r.API_RESPONSE_GET_PARTICIPANT })
  @ApiOkResponse({ description: r.API_RESPONSE_FOUND_RECORDS })
  @ApiBadRequestResponse({ description: r.API_RESPONSE_BAD_REQUEST })
  public async getAll() {
  ...
```

> Note: view source code files

## Add HTTPS to Server

```shell
# install dependencies required to use ExpressAdapter
$ npx lerna add @nestjs/platform-express --scope @convector-sample/server-rest --no-bootstrap
```

> use let's encrypt certificates, or self-signed, here we use self-signed for a fictitious domain `convector.sample.com`

```shell
# create dir to store self-signed certificates
$ mkdir packages/server-rest/config -p && cd packages/server-rest/config
# set/change domain
$ FICTITIOUS_DOMAIN=convector.sample.com
$ FILENAME_CERT=server.crt
$ FILENAME_KEY=server.key
# generate certificate
$ openssl genrsa -out $FILENAME_KEY 2048
$ openssl req -new -x509 -key $FILENAME_KEY -out $FILENAME_CERT -days 3650 -subj /CN=$FICTITIOUS_DOMAIN
# check a certificate and return information about it
$ openssl x509 -in $FILENAME_CERT -text -noout
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            b6:4f:d4:4e:06:98:ec:ce
    Signature Algorithm: sha256WithRSAEncryption
        Issuer: CN = convector.sample.com
        Validity
            Not Before: Aug 16 15:33:23 2019 GMT
            Not After : Aug 13 15:33:23 2029 GMT
        Subject: CN = convector.sample.com
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (2048 bit)
                Modulus:
                    00:aa:d1:4b:20:07:53:ee:ae:f8:e1:c3:6c:d7:a0:
                    e8:75:0b:ee:1d:b1:42:ca:0f:17:11:4b:0f:a8:75:
                    01:21:32:f0:24:b0:32:c8:6e:5d:2c:3d:4a:15:d7:
# check the SSL key and verify the consistency
$ openssl rsa -in $FILENAME_KEY -check
RSA key ok
writing RSA key
# check Validity
$ openssl x509 -in server.crt -text -noout | grep "Not After"
Not After : Aug 13 17:15:39 2029 GMT
```

> if want to certificate use FQDN domain ex <https://convector.sample.com:3000>, edit hosts and add FQDN

```shell
$ sudo nano /etc/hosts
# add
127.0.0.1       convector.sample.com
```

now we can use <https://convector.sample.com:3443> or <https://localhost:3443/api/>

one last change, change swagger scheme to https with `.setSchemes('https')` in `packages/server-rest/src/main.ts`

```typescript
const options = new DocumentBuilder()
  .setTitle(e.swaggerModuleTitle)
  .setDescription(e.swaggerModuleDescription)
  // .addTag('person')
  .addTag(`${e.swaggerApiPath}/${e.swaggerModuleTagPerson}`)
  .setSchemes('https')
  .build();
```

### Add Redirect Middleware (HTTP to HTTPS)

`packages/server-rest/src/middleware/redirect-middleware.ts`

```typescript
import { NextFunction, Request, Response } from 'express';
import { envVariables as e } from './env';

// custom redirect middleware
export const redirectMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!/https/.test(req.protocol)) {
    const redirectUrl = `https://${req.hostname}:${e.httpsPort}${req.originalUrl}`;
    res.redirect(redirectUrl);
  } else {
    return next();
  }
};
```

add `app.use(redirectMiddleware);` to `packages/server-rest/src/main.ts`

```typescript
...
async function bootstrap() {
  ...
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );
  // middleware: redirect
  app.use(redirectMiddleware);
```

### Test Https and HTTP to HTTPS Redirect

```shell
# launch server
$ npx lerna run start:debug --scope @convector-sample/server-rest --stream
```

now test http to https redirect, and https

### Enable CORS

add cors to `packages/server-rest/src/main.ts`

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  ...
  // enable cors
  app.enableCors();
  ...
```

## [Authentication](https://docs.nestjs.com/techniques/authentication)

- [NestJs: Authentication](https://docs.nestjs.com/techniques/authentication)

use passport strategy called passport-local that implements a username/password authentication mechanism, which suits our needs for this portion of our use case.

```shell
# install the required packages
$ npx lerna add @nestjs/passport --scope @convector-sample/server-rest --no-bootstrap
$ npx lerna add passport --scope @convector-sample/server-rest --no-bootstrap
$ npx lerna add passport-local --scope @convector-sample/server-rest --no-bootstrap
$ npx lerna add @types/passport-local  --scope @convector-sample/server-rest --dev --no-bootstrap
$ npx lerna bootstrap
```

start by generating an `AuthModule` and in it, an `AuthService`

```shell
# create auth module and service
$ cd packages/server-rest/
$ nest g module auth
$ nest g service auth
$ cd ../..
```

as we implement the `AuthService`, we'll find it useful to encapsulate user operations in a `UsersService`, so let's generate that module and service now:

```shell
# create users module and service
$ cd packages/server-rest/
$ nest g module users
$ nest g service users
$ cd ../..
```

replace the default contents of these generated files as shown below.

`packages/server-rest/src/users/users.service.ts`

```typescript
import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
```

add `exports: [UsersService],` to `packages/server-rest/src/users/users.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})

export class UsersModule { }
```

`AuthService` has the job of retrieving a user and verifying the password. We create a `validateUser()` method for this purpose

`packages/server-rest/src/auth/auth.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
```

update our `AuthModule` to import the `UsersModule`

`packages/server-rest/src/auth/auth.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AuthService],
})

export class AuthModule { }
```

### Authentication: [Implementing Passport local](https://docs.nestjs.com/techniques/authentication#implementing-passport-local)

implement our Passport local authentication strategy. Create a file called `local.strategy.ts` in the auth folder, and add the following code:

`packages/server-rest/src/auth/local.strategy.ts`

```typescript
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```

configure our `AuthModule` to use the Passport features we just defined. Update `auth.module.ts` to look like this:

`packages/server-rest/src/auth/auth.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})

export class AuthModule { }
```

### Authentication: [Built-in Passport Guards](https://docs.nestjs.com/techniques/authentication#built-in-passport-guards)

Login route

implement a bare-bones `/api/login` route, and apply the built-in Guard to initiate the passport-local flow.

add `/api/login` to `packages/server-rest/src/app.controller.ts`

```typescript
import { Controller, Get, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { AppService } from './app.service';
import { envVariables as e } from './env';
import express = require('express');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiExcludeEndpoint()
  redirectToApi(@Res() response: express.Response) {
    response.redirect(e.swaggerApiPath, HttpStatus.PERMANENT_REDIRECT);
  }

  @UseGuards(AuthGuard('local'))
  @Post(`/${e.swaggerApiPath}/login`)
  @ApiUseTags(e.swaggerModuleTagAuth)
  async login(@Request() req) {
    return req.user;
  }
}
```

with `@UseGuards(AuthGuard('local'))` we are using an `AuthGuard` that `@nestjs/passport` automatically provisioned for us when we extended the `passport-local` strategy...

launch server and test `/api/login` with a static user ex john/changeme

```shell
$ curl -k -X POST https://localhost:3443/api/login -d '{ "username": "john", "password": "changeme"}' -H 'Content-Type: application/json'

{"userId":1,"username":"john"}
```

### Authentication: [JWT functionality](https://docs.nestjs.com/techniques/authentication#jwt-functionality)

- Allow users to authenticate with username/password, returning a JWT for use in subsequent calls to protected API endpoints. We're well on our way to meeting this requirement. To complete it, we'll need to write the code that issues a JWT.
- Create API routes which are protected based on the presence of a valid JWT as a bearer TOKEN

```shell
# install the required packages
$ npx lerna add @nestjs/jwt --scope @convector-sample/server-rest --no-bootstrap
$ npx lerna add passport-jwt --scope @convector-sample/server-rest --no-bootstrap
$ npx lerna add @types/passport-jwt  --scope @convector-sample/server-rest --no-bootstrap --dev
$ npx lerna bootstrap
```

> The `@nest/jwt` package (see more [here](https://github.com/nestjs/jwt)) is a utility package that helps with **JWT manipulation**.
> The `passport-jwt` package is the Passport package that **implements the JWT strategy** and `@types/passport-jwt` provides the TypeScript type definitions.

update `packages/server-rest/src/auth/auth.service.ts` with `/api/login` route

```typescript
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    // note: we choose a property name of sub to hold our userId value to be consistent with JWT standards
    const payload = { username: user.username, sub: user.userId };
    return {
      // generate JWT from a subset of the user object properties
      accessToken: this.jwtService.sign(payload),
    };
  }
}
```

update the `AuthModule` to import the new dependencies and configure the `JwtModule`

add `packages/server-rest/src/auth/constants.ts`

```typescript
const jwtSecret = process.env.ACCESS_TOKEN_JWT_SECRET = 'secretKey';
const expiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN = '60s';

export const jwtConstants = {
  secret: jwtSecret,
  expiresIn: expiresIn,
};
```

add to `.env` `ACCESS_TOKEN_JWT_SECRET` env variable ex `ACCESS_TOKEN_JWT_SECRET=uKxHrE431MRgYoI8G6JKePsKhQ71kdZX`

now update `packages/server-rest/src/auth/auth.module.ts` with

```typescript
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    // configure the JwtModule using register(), passing configuration object
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})

export class AuthModule { }
```

update the `/api/login` route to return a JWT `return this.authService.login(req.user);`

```typescript
  ...
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
```

test routes using cURL again. You can test with any of the user objects hard-coded in the UsersService.

```shell
$ # POST to /api/login
$ curl -k -X POST https://localhost:3443/api/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX..."}
```

### Authentication: [Implementing Passport JWT](https://docs.nestjs.com/techniques/authentication#implementing-passport-jwt)

We can now address our final requirement: protecting endpoints by requiring a valid JWT be present on the request.
Passport can help us here too. It provides the `passport-jwt` strategy for securing RESTful endpoints with JSON Web Tokens.
Start by creating a file called `jwt.strategy.ts` in the `auth` folder, and add the following code:

add interface `packages/server-rest/src/auth/types/jwt-payload.interface.ts`

```typescript
export interface JwtPayload {
  exp: number;
  iat: number;
  sub: string | number;
  username: number;
}
```

`packages/server-rest/src/auth/jwt.strategy.ts`

```typescript
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // strategy requires some initialization
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      username: payload.username,
    };
  }
}
```

Add the new `JwtStrategy` as a provider in the `AuthModule`

```typescript
import { JwtStrategy } from './jwt.strategy';
...
providers: [AuthService, LocalStrategy, JwtStrategy]
...
```

### Authentication: [Implement protected route and JWT strategy guards](https://docs.nestjs.com/techniques/authentication#implement-protected-route-and-jwt-strategy-guards)

implement protected route and its associated Guard.

update `packages/server-rest/src/app.controller.ts` adding `/me` routte

```typescript
  ...
  @UseGuards(AuthGuard('jwt'))
  @ApiUseTags(`${e.swaggerApiPath}/${e.swaggerModuleTagAuth}`)
  @Get(`/${e.swaggerApiPath}/me`)
  getProfile(@Request() req) {
    return req.user;
  }
}
```

test the routes using cURL.

```shell
$ # GET /api/me
$ curl -k -X GET https://localhost:3443/api/me
# {"statusCode":401,"error":"Unauthorized"}
# POST /api/login
$ curl -k -X POST https://localhost:3443/api/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
# {"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm... }
# GET /api/me using accessToken returned from previous step as bearer code
$ JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTU2NjE1NTUzMiwiZXhwIjoxNTY2MTU5MTMyfQ.odYGDW2O_DTXKaz3l3oikhAtDgUSmxdWvjIqPODCicU
$ curl -k -X GET https://localhost:3443/api/me -H "Authorization: Bearer ${JWT}"
# {"userId":1,"username":"john"}
```

### Authentication: [Default strategy](https://docs.nestjs.com/techniques/authentication#default-strategy)

We need to do this because we've introduced two Passport strategies (`passport-local` and `passport-jwt`), both of which supply implementations of various Passport components. Passing the name disambiguates which implementation we're linking to. When multiple strategies are included in an application, **we can declare a default strategy so that we no longer have to pass the name in the `@AuthGuard` decorator** if using that default strategy. 
Here's how to register a default strategy when importing the `PassportModule`. This code would go in the `AuthModule`:

add `PassportModule.register({ defaultStrategy: 'jwt' }` to `packages/server-rest/src/auth/auth.module.ts` imports

```typescript
...
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
 ...
```

to use `defaultStrategy` we need to add `PassportModule.register({ defaultStrategy: 'jwt' })` to every import module where you want to use default strategy.
else we have an erro 500 when try to use `@UseGuards(AuthGuard())` in modules where we dont't add it to import

add to `packages/server-rest/src/participant/participant.module.ts` and `packages/server-rest/src/person/person.module.ts`

```typescript
@Module({
  ...
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
```

for more info about issue read [@nestjs/jwt - Cannot read property 'challenge' of undefined](https://github.com/nestjs/nest/issues/1031)

### Authentication: Guards, BearerAuth and Response decorators

add jwt Guards, BearerAuth and Unauthorized Response decorator to all routes

`packages/server-rest/src/app.controller.ts`
`packages/server-rest/src/person/person.controller.ts`
`packages/server-rest/src/participant/participant.controller.ts`

```typescript
@ApiBearerAuth()
@UseGuards(AuthGuard())
...
@ApiUnauthorizedResponse({ description: r.API_RESPONSE_UNAUTHORIZED })
```

### Authentication: Finish App controller Login and Profile routes

first add some DTO's

`packages/server-rest/src/auth/dto/index.ts`

```typescript
export * from './login-user.dto';
```

`packages/server-rest/src/auth/dto/login-user.dto.ts`

```typescript
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
```

`packages/server-rest/src/auth/dto/login-user-response.dto.ts`

```typescript
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserResponseDto {
  @ApiModelProperty()
  @IsString()
  readonly accessToken: string;
}
```

`packages/server-rest/src/auth/dto/get-profile-response.dto.ts`

```typescript
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class GetProfileResponseDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly username: string;
}
```

add all decorators and dto's to routes in `packages/server-rest/src/app.controller.ts`

```typescript
  ...
  @Post(`/${e.swaggerApiPath}/login`)
  @ApiUseTags(e.swaggerModuleTagAuth)
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ title: r.API_OPERATION_AUTH_LOGIN })
  @ApiCreatedResponse({ description: r.API_RESPONSE_LOGIN, type: LoginUserResponseDto })
  @ApiInternalServerErrorResponse({ description: r.API_RESPONSE_INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: r.API_RESPONSE_UNAUTHORIZED })
  async login(@Request() req, @Body() loginUserDto: LoginUserDto) {
    return this.authService.login(req.user);
  }

  @Get(`/${e.swaggerApiPath}/me`)
  @ApiUseTags(e.swaggerModuleTagAuth)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ title: r.API_OPERATION_GET_PROFILE })
  @ApiOkResponse({ description: r.API_RESPONSE_GET_PROFILE, type: GetProfileResponseDto })
  @ApiInternalServerErrorResponse({ description: r.API_RESPONSE_INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: r.API_RESPONSE_UNAUTHORIZED })
  getProfile(@Request() req) {
    return req.user;
  }
}
```

note for: `@Body() createPersonDto` to `packages/server-rest/src/app.controller.ts`, require to have the object in swagger parameters

### Authentication: Test Swagger With Authentication

1. enter <https://localhost:3443/api>
2. expand auth swagger tag
3. fire login request with `{ "username": "john", "password": "changeme" }`
4. copy `accessToken` to clipboard
5. click **authorize** button or **lock icon** and add 'Bearer PASTE-JWT-HERE'
6. fire get profile request. or other protected resource

done.....we have protected api and use it in swagger

> tip: if using curl with self-signed certificate use `-k`  or `--insecure` flag to allow for insecure server connections, else we have the classical response

```
curl failed to verify the legitimacy of the server and therefore could not
establish a secure connection to it. To learn more about this situation and
how to fix it, please visit the web page mentioned above.
```

## Change/Extend Person model to have authorization credentials

this refactor requires change some files, to use new model properties firstname, lastname, username, password and email

start change person chaincode, adding a few property fields and replace `name` to `firstname`

`packages/person-cc/src/person.model.ts`

```typescript

export class Person extends ConvectorModel<Person> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.examples.person';

  @Required()
  @Validate(yup.string())
  public firstname: string;

  @Required()
  @Validate(yup.string())
  public lastname: string;

  @Required()
  @Validate(yup.string())
  public username: string;

  @Required()
  @Validate(yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[1-9a-zA-Z]/, 'Password can only contain Latin letters and numbers.')
  )
  public password: string;

  @Required()
  @Validate(yup.string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email')
  )
  public email: string;

  @Validate(yup.array(Attribute.schema()))
  public attributes: Array<Attribute>;
}
```

change person controller to use `CreatePersonDto`

`packages/server-rest/src/person/person.controller.ts`

replace id, name arguments

```typescript
public async create(@Body() createPersonDto: CreatePersonDto): Promise<void> {
  try {
    return this.personService.create(createPersonDto.id, createPersonDto.name);
```

with `CreatePersonDto`

```typescript
public async create(@Body() createPersonDto: CreatePersonDto): Promise<void> {
  try {
    return this.personService.create(createPersonDto);
```

next do the same in, replace `personService.create` arguments signature from id, name to use `CreatePersonDto`

`packages/server-rest/src/person/person.service.ts`

```typescript
public async create(id: string, name: string) {
  try {
    const personToCreate = new Person({ id, name });
    return await PersonControllerBackEnd.create(personToCreate);
  } catch (err) {
    throw err;
  }
}
```

change to

```typescript
public async create(createPersonDto: CreatePersonDto) {
  try {
    const personToCreate = new Person({ ...createPersonDto });
    return await PersonControllerBackEnd.create(personToCreate);
  } catch (err) {
    throw err;
  }
}
```

to finish refactor, we must change `person.spec.ts` tests, change occurences of id, name, to id, firstname, lastname

`packages/person-cc/tests/person.spec.ts`

```typescript
...
  it('should try to create a person but no government identity has been registered', async () => {
    const personSample = new Person({
      id: personId,
      firstname: 'Walter',
      lastname: 'Montes',
    });
...
  it('should create a person', async () => {
    const personSample = new Person({
      id: personId,
      firstname: 'Walter',
      lastname: 'Montes',
    });

    ...

    expect(justSavedModel.firstname).to.exist;
    expect(justSavedModel.lastname).to.exist;
  });
...
  it('should try to create a person but the MIT cannot', async () => {
    const personSample = new Person({
      id: personId + '1111',
      firstname: 'Walter',
      lastname: 'Montes'
    });  
```

change `seed.sh` to reflect new model

```shell
echo "Creating participant: Big Government"
npx hurl invoke person participant_register gov "Big Government" -u admin

echo "Creating participant: MIT"
npx hurl invoke person participant_register mit "MIT" -u user1 -o org1

echo "Creating participant: National Bank"
npx hurl invoke person participant_register naba "National Bank" -u user1 -o org2

echo "Creating person: John Doe"
npx hurl invoke person person_create "{ \"id\": \"1-100-100\", \"firstname\": \"John\", \"lastname\": \"Doe\", \"username\": \"johndoe\", \"password\": \"12345678\", \"email\": \"john.doe@mail.com\"}" -u admin

echo "Adding attribute 'birth-year' as the Big Government identity"
npx hurl invoke person person_addAttribute "1-100-100" "{\"id\": \"birth-year\", \"certifierID\": \"gov\", \"content\": \"1993\", \"issuedDate\": 1554239270 }" -u admin

npx hurl invoke person person_create "{ \"id\": \"1-100-101\", \"firstname\": \"Jane\", \"lastname\": \"Doe\", \"username\": \"janedoe\", \"password\": \"12345678\", \"email\": \"jane.doe@mail.com\"}" -u admin
npx hurl invoke person person_addAttribute "1-100-101" "{\"id\": \"birth-year\", \"certifierID\": \"gov\", \"content\": \"1993\", \"issuedDate\": 1554239270 }" -u admin

npx hurl invoke person person_create "{ \"id\": \"1-100-102\", \"firstname\": \"Dick\", \"lastname\": \"Doe\", \"username\": \"dickdoe\", \"password\": \"12345678\", \"email\": \"dick.doe@mail.com\"}" -u admin
npx hurl invoke person person_addAttribute "1-100-102" "{\"id\": \"birth-year\", \"certifierID\": \"gov\", \"content\": \"1988\", \"issuedDate\": 1554239270 }" -u admin
```

## Renew and Deploy new upgraded ChainCode after chaincode model Changes

to prevent problems with model changes, we must renew hyperledger stack, and upgrade new chaincode with person model updated

```shell
# restart hyperledger fabric
$ npm run env:restart
# build chainCode
# deploy smart contract
$ npm run cc:start -- person
Instantiated Chaincode at org1
# seed ledger with new seed.sh with new model properties
$ npm run seed
# after restart hyperledger always create views
$ ./views/install.sh
Installing template views
{"ok":true,"id":"_design/person","rev":"1-a1afaedf5e49e4f592a3089e599b0f8f"}
Installed template views
# create on more person with hurley. note: after deploy/upgrade wait a few second/minutes in first invoke
$ npx hurl invoke person person_create "{ \"id\": \"1-100-103\", \"firstname\": \"Pete\", \"lastname\": \"Doe\", \"username\": \"pete\", \"password\": \"12345678\", \"email\": \"pete.doe@example.com\"}" -u admin
# invoke ledger to get all persons
$ npx hurl invoke person person_getAll
```

everything seems working has expected, now we will test chaincode from server requests

```shell
# boot rest server
$ npx lerna run start:debug --scope @convector-sample/server-rest --stream
# login to get fresh accessToken and assign it to env variable with same name $accessToken (require jq installed)
$ $( curl -k -X POST https://localhost:3443/api/login -d '{ "username": "john", "password": "changeme"}' -H 'Content-Type: application/json' | jq -r 'keys[] as $k | "export \($k)=\(.[$k])"' )
# copy accessToken to clipboard to use in swagger or ignore and use curl with $accessToken (required xclip installed)
$ echo $accessToken | xclip -se c
# show last userId from ledger, to use in create person request incrementing id ex.: "1-100-103", we use next incremented id "1-100-104"
$ curl -k -X GET https://localhost:3443/api/person -H "accept: application/json" -H "Authorization: Bearer ${accessToken}" | jq '.[-1].id'
"1-100-103"
# create person in ledger with curl
$ curl -k -X POST "https://localhost:3443/api/person" \
  -H "accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${accessToken}" \
  -d "{ \"id\": \"1-100-104\", \"firstname\": \"Jack\", \"lastname\": \"Doe\", \"username\": \"jack\", \"password\": \"12345678\", \"email\": \"jack.doe@example.com\"}"
{"type":"Buffer","data":[]}
# request all persons to check everything is ok
$ curl -k -X GET "https://localhost:3443/api/person" \
  -H "accept: application/json" \
  -H "Authorization: Bearer ${accessToken}" | jq
```

> Note: if above error occurs in server log, when request users, it because **we forgot to create couchdb indexs**, install views with `./views/install.sh` and try again

```shell
server: {
server:   "code": "EDOCMISSING",
server:   "body": {
server:     "error": "not_found",
server:     "reason": "missing"
server:   }
server: }
```

## Start to encrypt passwords with BCrypt

```shell
# install required dependencies
$ npx lerna add bcrypt --scope @convector-sample/person-cc --no-bootstrap
$ npx lerna add @types/bcrypt --scope @convector-sample/person-cc --no-bootstrap
$ npx lerna add bcrypt --scope @convector-sample/server-rest --no-bootstrap
$ npx lerna add @types/bcrypt --scope @convector-sample/server-rest --no-bootstrap
$ npx lerna bootstrap
```

add bcrypt util to hash password `packages/person-cc/src/utils.ts`. we encrypt passwords in chainCode, this way works in all modes, with chainCode hurley invokes and with curl/requests to server.

```typescript
import * as bcrypt from 'bcrypt';

const bcryptSaltRounds: number = 10;

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, bcryptSaltRounds);
};
```

```shell
# upgrade smart contract
$ npm run cc:upgrade -- person 1.1
Installed Chaincode person version 1.1  at org2
Upgrading Chaincode person version 1.1 at org1 for channel ch1
It may take a few minutes depending on the chaincode dependencies
Upgraded Chaincode at org1
# create another user
$ npx hurl invoke person person_create "{ \"id\": \"1-100-105\", \"firstname\": \"Luke\", \"lastname\": \"Doe\", \"username\": \"luke\", \"password\": \"12345678\", \"email\": \"luke.doe@example.com\"}" -u admin
# invoke ledger to get all persons
$ npx hurl invoke person person_get 1-100-105
[hurley] - Result: {"_email":"luke.doe@example.com","_firstname":"Luke","_id":"1-100-105","_lastname":"Doe","_password":"$2b$10$pitp5NpCT62QTLGi.xpvZe6/BgCjxeBbUJBWAMBokdP2rWAtJGqkW","_type":"io.worldsibu.person","_username":"luke"}
# done we have bcrypt'ed the passwords
{
  "_id": "1-100-105",
  "_rev": "1-bf7ead9f4b1c63c5f3d34d2d71de8f3c",
  "email": "luke.doe@example.com",
  "firstname": "Luke",
  "id": "1-100-105",
  "lastname": "Doe",
  "password": "$2b$10$pitp5NpCT62QTLGi.xpvZe6/BgCjxeBbUJBWAMBokdP2rWAtJGqkW",
  "type": "io.worldsibu.person",
  "username": "luke",
  "~version": "\u0000CgMBFAA="
}
```

## Create common Package to share stuff `@convector-rest-sample/common`

> this post belongs to a github project that have a `nest.js` server, but currently is not created, when I have the link I update this post

- [Stack Overflow Link](https://stackoverflow.com/questions/57617080/how-to-create-a-common-package-to-share-common-logic-in-convector-packages/57617109#57617109)

first we start to create a lerna package for typescript, by hand

### Create lerna common package `@convector-rest-sample/common`

`packages/common/tsconfig.json`

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "."
  },
  "include": [
    "./src/**/*"
  ]
}
```

`packages/common/package.json`

```json
{
  "name": "@convector-rest-sample/common",
  "version": "0.1.0",
  "main": "dist/src/index",
  "types": "dist/src/index",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "npm run clean && tsc",
    "clean": "rm -rf ./dist",
    "prepublishOnly": "npm run build"
  },
  "devDependencies": {
    "typescript": "3.4.3"
  }
}
```

> Note: the paths `"main": "dist/src/index"` and `"types": "dist/src/index"` are important and must point to location of the index file, if we use a wrong path, we get errors using the package

create the index to export package files

`packages/common/src/index.ts`

```typescript
export * from './constants';
```

`packages/common/src/constants.ts`

```typescript
// convector model
const CONVECTOR_MODEL_PATH_PREFIX: string = 'io.worldsibu.examples';
const CONVECTOR_MODEL_PATH_PARTICIPANT: string = `${CONVECTOR_MODEL_PATH_PREFIX}.participant`;
const CONVECTOR_MODEL_PATH_PERSON: string = `${CONVECTOR_MODEL_PATH_PREFIX}.person`;
const CONVECTOR_MODEL_PATH_ATTRIBUTE: string = `${CONVECTOR_MODEL_PATH_PREFIX}.attribute`;
const CONVECTOR_MODEL_PATH_X509IDENTITY: string = `${CONVECTOR_MODEL_PATH_PREFIX}.x509identity`;

export const appConstants = {
  CONVECTOR_MODEL_PATH_PARTICIPANT,
  CONVECTOR_MODEL_PATH_PERSON,
  CONVECTOR_MODEL_PATH_ATTRIBUTE,
  CONVECTOR_MODEL_PATH_X509IDENTITY,
};
```

now add the common package to all packages in monorepo

```shell
# add to all packages (without scope)
$ npx lerna add @convector-rest-sample/common@0.1.0
# to prevent some problems always use same version has in local package
# clean and bootstrap
$ npx lerna clean -y && npx lerna bootstrap
```

optional can use `--scope` to add only to desired packages

```shell
# add to all packages (with scope)
$ npx lerna add @convector-rest-sample/common@0.1.0 --scope @convector-sample/server-rest --no-bootstrap
$ npx lerna add @convector-rest-sample/common@0.1.0 --scope @convector-sample/participant-cc --no-bootstrap
$ npx lerna add @convector-rest-sample/common@0.1.0 --scope @convector-sample/person-cc --no-bootstrap
# clean and bootstrap
$ npx lerna clean -y && npx lerna bootstrap --hoist
```

now test `@convector-rest-sample/common` in server, add this lines to top of `packages/server-rest/src/app.ts`
to confirm that everything is working has expected

> Note: if don't have a server, skip this step right to **Use common package inside ChainCode** section

```typescript
import { appConstants as c } from '@convector-rest-sample/common';
debugger;
Logger.log(JSON.stringify(c, undefined, 2));
```

now launch server with debugger, and inspect `c` object or view log result

```shell
$ npx lerna run start:debug --scope @convector-sample/server-rest --stream
```

if outputs appConstants we are ready to go, and common package works has expected

### Use common package inside ChainCode

To use common package inside chaincode, is very tricky, and I lost a few hours to get it work, thanks to Walter and Diego from WorldSibu I get it.
The problem is that currently, in convector there is no easy way to use packages, that are not controllers, for this to work we must create a fake controller in `@convector-rest-sample/common` to put it to work

first install required controller dependency in our `@convector-rest-sample/common`, this is required ut use `{ Controller, Invokable }`

```shell
# install dependency
$ npx lerna add @worldsibu/convector-core --scope @convector-rest-sample/common
```

next we must create a fake controller in `packages/common/src/common.controller.ts`

```typescript
import { Controller, Invokable } from '@worldsibu/convector-core';

@Controller('common')
export class CommonController {
  @Invokable()
  public async greeting() {
    return 'Hello from CommonController';
  }
}
```

don't forget to add `export * from './common.controller';` to `packages/common/src/index.ts` to export controller

```typescript
export * from './constants';
export * from './common.controller';
```

after that we must change `chaincode.config.json` to add the fake controller, this is a hell of a hack, we use a fake controller to force the `@convector-rest-sample/common` to be copied inside `chaincode-person` dir, without this, the `@convector-rest-sample/common` is not copied and we have a broken chain code when we try deploy it with `cc:start` or `cc:upgrade` it always show the annoying error `npm ERR! 404 Not Found: @convector-rest-sample/common@0.1.0`

first change `chaincode.config.json`

> Tip: if don't have it in project, copy `org1.person.config.json` to `chaincode.config.json` and move on....

in my case I have only the legacy files `org1.participant.config.json`, `org1.person.config.json`, `org2.participant.config.json` and `org2.person.config.json`

> this files can be deleted (Diego tip)

ok let's change `chaincode.config.json` and add another controller above `person-cc`

```json
"controllers": [
  {
    "name": "participant-cc",
    "version": "file:./packages/participant-cc",
    "controller": "ParticipantController"
  },
  {
    "name": "person-cc",
    "version": "file:./packages/person-cc",
    "controller": "PersonController"
  },
  // BO : ADD THIS
  {
    "name": "@convector-rest-sample/common",
    "version": "file:./packages/common",
    "controller": "CommonController"
  }
  // EO : ADD THIS
],
```

> Note: this is another clever tricky part, the `name` is the **package name**, like the one we use in imports, `version` is the **path location** inside of our build `chaincode-person`

before build chaincode we must change our models to use the new common constants from `@convector-rest-sample/common` ex `c.CONVECTOR_MODEL_PATH_X509IDENTITY`, currently this common package only use simple constants, to keep it simple, the point is created common logic for all the packages, rest-server, front-end, packages-cc, cli-tools, etc

`packages/participant-cc/src/participant.model.ts`

```typescript
import { appConstants as c } from '@convector-rest-sample/common';
...
export class x509Identities extends ConvectorModel<x509Identities>{
  @ReadOnly()
  public readonly type = c.CONVECTOR_MODEL_PATH_X509IDENTITY;
  ...
export class Participant extends ConvectorModel<Participant> {
  @ReadOnly()
  public readonly type = c.CONVECTOR_MODEL_PATH_PARTICIPANT;
  ...
```

`packages/person-cc/src/person.model.ts`

```typescript
import { appConstants as c } from '@convector-rest-sample/common';
...
export class Attribute extends ConvectorModel<Attribute>{
  @ReadOnly()
  @Required()
  public readonly type = c.CONVECTOR_MODEL_PATH_ATTRIBUTE;
  ...
export class Person extends ConvectorModel<Person> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.examples.person';
  ...
```

now we can `cc:package` the chaincode `chaincode-person`, this will package the chaincode with our `@convector-rest-sample/common` inside it with packages `person-cc` and `participant-cc` using our `@convector-rest-sample/common` constants

```shell
# first remove chaincode (optional)
$ rm chaincode-person -r
# now manually invoke package command
$ npm run cc:package -- person org1
```

after package our chaincode is advised to check if common package is copied to `chaincode-person` folder to the right path

```shell
$ ls -la chaincode-person/packages
chaincode-person/packages/@convector-rest-sample
chaincode-person/packages/participant-cc
chaincode-person/packages/person-cc
```

another good practice is check if inside `chaincode-person` folder, in file `chaincode-person/package.json`, if our `@convector-rest-sample/common` was added to `dependencies`, in above json block we can see `cc:package` script add line `"@convector-rest-sample/common": "file:./package/@convector-rest-sample/common"`, this is created based on our changes in `chaincode.config.json` remember, when we add the fake controller

```json
"dependencies": {
  "@theledger/fabric-chaincode-utils": "^4.0.1",
  "@worldsibu/convector-core": "^1.3.3",
  "@worldsibu/convector-storage-stub": "^1.3.3",
  "reflect-metadata": "^0.1.12",
  "tslib": "^1.9.0",
  "participant-cc": "file:./packages/participant-cc",
  "person-cc": "file:./packages/person-cc",
  // BO: magic line here
  "@convector-rest-sample/common": "file:./packages/@convector-rest-sample/common"
  // EO: magic line here
},
```

done now we can deploy our chaincode with `cc:start` or `cc:upgrade`

> Tip: if is first time use `cc:start`, if not use `cc:package`

to check that everything is fine from start, we restart our hyperledger stack, and start from the beginning, **warning it destroy all data**, if don't want to destroy data don't fire `npm run env:restart` and use `cc:upgrade`, more above

```shell
# this recreate environment and destroy all data
$ npm run env:restart
$ npm run cc:start -- person
# seed ledger
$ npm run seed
# create couchdb  views
$ ./views/install.sh
# invoke person_create
$ npx hurl invoke person person_create "{ \"id\": \"1-100-103\", \"firstname\": \"Pete\", \"lastname\": \"Doe\", \"username\": \"pete\", \"password\": \"12345678\", \"email\": \"pete.doe@example.com\"}" -u admin
# invoke some stuff (wait for first invoke finish)
$ npx hurl invoke person person_getAll
```

done, everything is working has expected and we have a `@convector-rest-sample/common` package implemented.

if we check couchdb `1-100-103` person, we can check that is using type `"type": "io.worldsibu.examples.person"` that comes from our constants in our `@convector-rest-sample/common`, proving that it gets its value from `@convector-rest-sample/common`, believe me, if it won't wont find `@convector-rest-sample/common` it crash.....simple

for future changes in chaincode, upgrade it with above command

```shell
# upgrade chaincode
$ npm run cc:upgrade -- person 1.1
```

we are done........

### Use scripts to copy other files to chaincode

another thing that I tried to hack before find the solution, is using `npm scripts` but it won't work because we need the modified `chaincode-person/package.json` with `"@convector-rest-sample/common": "file:./packages/@convector-rest-sample/common"` in the `dependencies`, but I try it......

leave it here, maybe can be useful for other kind of stuff, like copy other type of stuff

```json
{
  "scripts": {
    ...
    "cc:package": "f() { npm run lerna:build; chaincode-manager --update --config ./$2.$1.config.json --output ./chaincode-$1 package; npm run copy:indexes -- $1; npm run copy:package:common -- $1; }; f",
    ...
    "copy:package:common": "f () { mkdir -p ./chaincode-$1/node_modules/@convector-rest-sample/; cp -r ./packages/common/ ./chaincode-$1/node_modules/@convector-rest-sample/; }; f"
    ...
```

> note for `npm run copy:package:common -- $1;` in `"cc:package"`, and `cp -r ./packages/common/ ./chaincode-$1/node_modules/@convector-rest-sample/; };` in `"copy:package:common"`, it works, but won't modify `chaincode-person/package.json` with lines

```json
"dependencies": {
  "@theledger/fabric-chaincode-utils": "^4.0.1",
  "@worldsibu/convector-core": "^1.3.3",
  "@worldsibu/convector-storage-stub": "^1.3.3",
  "reflect-metadata": "^0.1.12",
  "tslib": "^1.9.0",
  "participant-cc": "file:./packages/participant-cc",
  "person-cc": "file:./packages/person-cc",
  // BO: magic line here
  "@convector-rest-sample/common": "file:./packages/@convector-rest-sample/common"
  // EO: magic line here
}
```

### Clean Up

to finish we can remove the legacy files `org1.participant.config.json org1.person.config.json org2.person.config.json org2.participant.config.json`, now we use the config file `chaincode.config.json` (thanks for the tip Diego)

```shell
# remove legacy files
rm org1.participant.config.json org1.person.config.json org2.person.config.json org2.participant.config.json
```

Note: don't forget to update `packages.json` `"cc:package"` with new `./chaincode.config.json` file, replace `$2.$1.config.json` with `chaincode.config.json`

`package.json`

```json
"cc:package": "f() { npm run lerna:build; chaincode-manager --update --config ./chaincode.config.json --output ./chaincode-$1 package; npm run copy:indexes -- $1; }; f",
```

## Implement UsersService with ledger Persons/Users authentication

to start implement users authentication with chaincode, and to test it with moked array of users in `users.service.ts` we create a configuration variable in `env.ts` to use moked or chaincode users.

`env.ts`

```typescript
// authService : true: moked users array, false: or ledger person(users) authentication
authServiceUseMokedUsers: process.env.AUTH_SERVICE_USE_MOKED_USERS || true
```

add to `.env` `AUTH_SERVICE_USE_MOKED_USERS=false` to use ledger authentication

next we extend `Person` model with properties for `roles`, `participant`, participant is useful to link users to participants/organizations, this way we can have duplicated usernames for different organizations, this way users don't collide

`packages/person-cc/src/person.model.ts`

```typescript
...
import { Participant } from 'participant-cc';
...
export class Person extends ConvectorModel<Person> {
  ...

  @Default(['USER'])
  @Validate(yup.array().of(yup.string()))
  public roles: Array<String>;

  @Required()
  @Validate(Participant.schema())
  public participant: FlatConvectorModel<Participant>;
}
```

next add `getParticipantByIdentity` function to utils, useful to get current participant from identity inside convector controllers, for more info read [How can I get participant/organization inside convector controllers?](https://stackoverflow.com/questions/57641763/how-can-i-get-participant-organization-inside-convector-controllers)

`packages/person-cc/src/utils.ts`

```typescript
import { appConstants as c } from '@convector-rest-sample/common';
...
import { Participant } from 'participant-cc';
...
export const getParticipantByIdentity = async (fingerprint: string): Promise<Participant> => {
  const participant: Participant | Participant[] = await Participant.query(Participant, {
    selector: {
      type: c.CONVECTOR_MODEL_PATH_PARTICIPANT,
      identities: {
        $elemMatch: {
          fingerprint,
          status: true
        }
      }
    }
  });

  if (!!participant && !participant[0].id) {
    throw new Error('Cant find a participant with that fingerprint');
  }
  return participant[0];
}
```

next we move to `PersonController` to extend `create` method with new `participant` property, and implement a `getByUsername` chaincode method to get `Person` from username in our chaincode methods, useful for logins that use username

`packages/person-cc/src/person.controller.ts`

```typescript
import { appConstants as c } from '@convector-rest-sample/common';
...
import { getParticipantByIdentity, hashPassword } from './utils';

@Controller('person')
export class PersonController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async create(
    @Param(Person)
    person: Person
  ) {
    // get host participant from fingerprint
    const participant: Participant = await getParticipantByIdentity(this.sender);
    if (!!participant && !participant.id) {
      throw new Error('There is no participant with that identity');
    }

    const exists = await Person.getOne(person.id);
    if (!!exists && exists.id) {
      throw new Error('There is a person registered with that Id already');
    }

    const existsUsername = await Person.query(Person, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_PERSON,
        username: person.username,
        participant: {
          id: participant.id
        }
      }
    });
    if (!!existsUsername && exists.id) {
      throw new Error('There is a person registered with that username already');
    }

    let gov = await Participant.getOne('gov');
    if (!gov || !gov.identities) {
      throw new Error('No government identity has been registered yet');
    }
    const govActiveIdentity = gov.identities.find(identity => identity.status === true);

    if (!govActiveIdentity) {
      throw new Error('No active identity found for participant');
    }
    if (this.sender !== govActiveIdentity.fingerprint) {
      throw new Error(`Just the government - ID=gov - can create people - requesting organization was ${this.sender}`);
    }

    // add participant
    person.participant = gov;
    // hashPassword before save model
    person.password = hashPassword(person.password);

    await person.save();
  }
  ...

  @Invokable()
  public async getByUsername(
    @Param(yup.string())
    username: string,
  ) {
    // get host participant from fingerprint
    const participant: Participant = await getParticipantByIdentity(this.sender);
    console.log('participant', JSON.stringify(participant, undefined, 2));

    const existing = await Person.query(Person, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_PERSON,
        username,
        participant: {
          id: participant.id
        }
      }
    });
    if (!existing || !existing[0].id) {
      throw new Error(`No person exists with that username ${username}`);
    }
    return existing;
  }
}
```

we are done with `PersonController` moving forward to `PersonService` to implement `getByUsername` method, to comunicate with chaincode method with same name, implemented above

`packages/server-rest/src/person/person.service.ts`

```typescript
...
public async getByUsername(username: string): Promise<Person> {
  try {
    const user = await PersonControllerBackEnd.getByUsername(username);
    // create Person model
    const userModel = new Person((user[0]));
    return userModel;
  } catch (err) {
    throw err;
  }
}
...
```

change `findOne` method on `UsersService` to use both methods moked users and ledger, based on config `AUTH_SERVICE_USE_MOKED_USERS` environment variable

`packages/server-rest/src/users/users.service.ts`

```typescript
async findOne(username: string): Promise<User | undefined> {
  if (e.authServiceUseMokedUsers === 'true') {
    return this.users.find(user => user.username === username);
  } else {
    try {
      return await this.personService.getByUsername(username);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      const message: string = (err.responses[0]) ? err.responses[0].error.message : c.API_RESPONSE_INTERNAL_SERVER_ERROR;
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
```

to finish authentication we update `AuthService` `validateUser` method

`packages/server-rest/src/auth/auth.service.ts`

```typescript
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  // called by LocalStrategy
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    let authorized: boolean;
    if (e.authServiceUseMokedUsers === 'true') {
      authorized = (user && user.password === pass);
    } else {
      authorized = this.bcryptValidate(pass, (user as Person).password);
    }

    if (authorized) {
      // protect expose password property to outside
      // use spread operator to assign password to password, and all the other user props to result
      // required .toJSON()
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  // called by appController
  async login(user: any) {
    // note: we choose a property name of sub to hold our userId value to be consistent with JWT standards
    const payload = { sub: user.id, username: user.username };
    return {
      // generate JWT from a subset of the user object properties
      accessToken: this.jwtService.sign(payload),
    };
  }

  bcryptValidate = (password: string, hashPassword: string): boolean => {
    return bcrypt.compareSync(password, hashPassword);
  }
}
```

now we can start testing the new network authentication

WIP

$ npx hurl invoke person participant_changeIdentity great newIdentity -u admin
{ Error: transaction returned with failure: {"name":"Error","status":500,"message":"Unauthorized. Requester identity is not an admin"}

npx hurl invoke person person_create "{ \"id\": \"1-100-103\", \"firstname\": \"Pete\", \"lastname\": \"Doe\", \"username\": \"pete\", \"password\": \"12345678\", \"email\": \"pete.doe@example.com\"}" -u admin

npx hurl invoke person person_create "{\"id\": \"1-100-103\",\"firstname\":\"Pete\",\"lastname\":\"Doe\",\"username\": \"pete\",\"password\": \"12345678\",\"email\": \"pete.doe@example.com\",\"roles\": [\"USER\",\"ADMIN\"]}" -u admin

{
  "id": "1-100-103",
  "firstname": "Pete",
  "lastname": "Doe",
  "username": "pete",
  "password": "12345678",
  "email": "pete.doe@example.com",
  "roles": [
    "USER","ADMIN"
  ]
}

## Clean up and solve problem of `@babel/.highlight.DELETE@latest` when use lerna bootstrap

```
npm ERR! 404 Not Found - GET https://registry.npmjs.org/@babel%2f.highlight.DELETE - Not found
npm ERR! 404
npm ERR! 404  '@babel/.highlight.DELETE@latest' is not in the npm registry.
```

```shell
# clean up
$ npx lerna clean
$ rm -r node_modules
$ npm i
$ npx lerna bootstrap
```

## Solve custom nestjs packages dependencies

```shell
$ npx lerna add ./packages-nestjs/@koakh/nestjs-auth-quick-config --scope @convector-sample/server-graphql
lerna notice cli v3.16.4
lerna info filter [ '@convector-sample/server-graphql' ]
lerna ERR! TypeError: Invalid comparator: /media/mario/Storage/Development/BlockChain/Convector/@koakh/nestjs-easyconfig
lerna ERR!     at Comparator.parse (/media/mario/Storage/Development/BlockChain/Convector/
```

> somehow its is giving probles with old package, `npm ERR! Could not install from "../@koakh/nestjs-easyconfig" as it does not contain a package.json file.`

somehow every `package.json` of packages remains with that lost line

`"undefined": "/media/mario/Storage/Development/BlockChain/Convector/@koakh/nestjs-easyconfig"`

must remove it from every packages/**/package.json project
