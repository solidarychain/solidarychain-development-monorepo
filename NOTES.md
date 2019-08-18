# NOTES

This is a simple NestJs starter, based on above links, I only extended it with a few things like swagger api, https, jwt, and other stuff, thanks m8s

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

# deploy smart contract
$ npm run cc:start -- person
# upgrade smart contract
$ npm run cc:upgrade -- person 1.1
# note: after deploy/upgrade wait a few second/minutes in first invoke

# run dev
$ npx lerna run start:dev --scope server --stream
# debug
$ npx lerna run start:debug --scope server --stream
```

## Uris and Endpoints

### Tools

- [Fauxton](http://localhost:5084/_utils/#database/)

### Endpoints

- <http://localhost:3000/participant/>
- <http://localhost:3000/person/>

## Fixs

if have problems after install packages with `lerna add` and with chaincodes, ex with `lerna bootstrap`
and have error not found chaincode package on npm registry like `'participant-cc@^0.1.0' is not in the npm registry`, just rebuild chaincode, and next `lerna bootstrap`

```shell
$ npx lerna run build --scope participant-cc
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

1. Install/Update Hurley which will help us to set up a testing network `npm i -g @worldsibu/hurley`

2. Install/Update the NestJS CLI by running `npm install -g @nestjs/cli`

3. Recreate repo with `rm .git -r && git init`

4. Run `rm -rf ./packages/server` to delete Express App.

5. Edit `.gitignore`

6. Move to the package folder run `cd packages && nest new server && cd ..`. This is going to scaffold a NestJS project for you.

7. Install `env-cmd` with lerna for handle environmental variables `npx lerna add env-cmd --dev --scope server --no-bootstrap`

8. Install the smart contract packages that are going to be consumed by NestJS

```shell
$ npx lerna add participant-cc --scope server --no-bootstrap
$ npx lerna add person-cc --scope server --no-bootstrap
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

## Start Code It: Modules, Controlllers and Services

```shell
# enter nestjs dir
cd packages/server
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

create `packages/server/.env` with

```config
PORT=3000
```

add `.env` to `.gitignore` with `echo packages/server/.env >> .gitignore`

Now, what we need to do is start migrating the logic. All the code related to the communication with convector and any other heavy calculation to our services and the controllers are going to be in charge of exposing the endpoints and pass down the data to the services.

## Create files

- `packages/server/src/participant/participant.controller.ts`
- `packages/server/src/participant/participant.service.ts`
- `packages/server/src/person/person.controller.ts`

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
$ npx lerna run start:dev --scope server --stream

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
{"id":"1-00200-2222-1","type":"io.worldsibu.person","name":"John Doe","attributes":[{"certifierID":"gov","content":1993,"id":"birth-year","issuedDate":1565561317567,"type":"io.worldsibu.attribute"}]}

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

- `packages/server/src/participant/types/participant.ts`
- `packages/server/src/participant/types/index.ts`
- `packages/server/src/person/types/index.ts`
- `packages/server/src/person/types/person.ts`

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
    }, couchDBView);
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

add `"node"` to `packages/server/package.json`

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

Fix: was adding missing `providers: [PersonService]` on `packages/server/src/person/person.controller.spec.ts`

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
$ npx lerna add @nestjs/swagger --scope server --no-bootstrap
$ npx lerna add swagger-ui-express --scope server --no-bootstrap
# required for models
$ npx lerna add class-validator --scope server --no-bootstrap
$ npx lerna add class-transformer --scope server --no-bootstrap
$ npx lerna bootstrap
```

### Initialize the Swagger using SwaggerModule

- [Nest.JS OpenAPI (Swagger)](https://docs.nestjs.com/recipes/swagger)

add to `packages/server/src/env.ts`

```typescript
export const swaggerModuleTitle = process.env.SWAGGER_MODULE_TITLE || 'Person ChainCode';
export const swaggerModuleDescription = process.env.SWAGGER_MODULE_DESCRIPTION = 'Convector Person ChainCode API';
export const swaggerModuleVersion = process.env.SWAGGER_MODULE_VERSION = '1.0';
export const swaggerApiPath = process.env.SWAGGER_API_PATH = 'api';
export const swaggerModuleTagPerson = process.env.SWAGGER_MODULE_TAG_PERSON = 'person';
export const swaggerModuleTagParticipant = process.env.SWAGGER_MODULE_TAG_PERSON = 'participant';
```

add to `packages/server/src/main.ts`

```typescript
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
...
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // initialize SwaggerModule
  const options = new DocumentBuilder()
    .setTitle(swaggerModuleTitle)
    .setDescription(swaggerModuleDescription)
    .setVersion(swaggerModuleVersion)
    .addTag(swaggerModuleTagPerson)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerApiPath, app, document);

  await app.listen(3000);
}
...
```

### Redirect root to Api

change default `@Get` controller in `packages/server/src/app.controller.ts` to

```typescript
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiExcludeEndpoint()
  redirectToApi(@Res() response: express.Response) {
    response.redirect(swaggerApiPath, HttpStatus.PERMANENT_REDIRECT);
  }
}
```

### Test Swagger Api and Redirect

```shell
# boot server and test api docs
$ npx lerna run start:dev --scope server --stream
```

open your browser and navigate to <http://localhost:3000/api/>
to download swagger JSON file, fire request to <http://localhost:3000/api-json>
test redirect navigate to <http://localhost:3000> this will redirect to <http://localhost:3000/api/>

### Create Swagger DTO's

now we need to create model/DTO's for all endpoints that have `@Body`

`packages/server/src/participant/dto/register-participant.dto.ts`

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

`packages/server/src/person/dto/add-person-attribute.dto.ts`

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

`packages/server/src/person/dto/create-person.dto.ts`

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

`packages/server/src/person/dto/get-person-by-attribute.dto.ts`

```typescript
import { ApiModelProperty } from '@nestjs/swagger';

export class GetPersonByAttributeDto {
  @ApiModelProperty()
  readonly value: any;
}
```

now replace json objects ex { id, name } with DTO's

`packages/server/src/participant/participant.controller.ts`

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

`packages/server/src/person/person.controller.ts`

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

create a `packages/server/src/constants.ts` file to prevent DRY/hard-code strings

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

add `packages/server/src/participant/participant.controller.ts` and `packages/server/src/person/person.controller.ts`

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
$ npx lerna add @nestjs/platform-express --scope server --no-bootstrap
```

> use let's encrypt certificates, or self-signed, here we use self-signed for a fictitious domain `convector.sample.com`

```shell
# create dir to store self-signed certificates
$ mkdir packages/server/config -p && cd packages/server/config
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

one last change, change swagger scheme to https with `.setSchemes('https')` in `packages/server/src/main.ts`

```typescript
const options = new DocumentBuilder()
  .setTitle(swaggerModuleTitle)
  .setDescription(swaggerModuleDescription)
  .setVersion(swaggerModuleVersion)
  .addTag(swaggerModuleTagPerson)
  .setSchemes('https')
  .build();
```

### Add Redirect Middleware (HTTP to HTTPS)

`packages/server/src/middleware/redirect-middleware.ts`

```typescript
import { NextFunction, Request, Response } from 'express';
import { httpsPort } from '../env';

// custom redirect middleware
export const redirectMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!/https/.test(req.protocol)) {
    const redirectUrl = `https://${req.hostname}:${httpsPort}${req.originalUrl}`;
    res.redirect(redirectUrl);
  } else {
    return next();
  }
};
```

add `app.use(redirectMiddleware);` to `packages/server/src/main.ts`

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
$ npx lerna run start:debug --scope server --stream
```

now test http to https redirect, and https

### Enable CORS

add cors to `packages/server/src/main.ts`

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
$ npx lerna add @nestjs/passport --scope server --no-bootstrap
$ npx lerna add passport --scope server --no-bootstrap
$ npx lerna add passport-local --scope server --no-bootstrap
$ npx lerna add @types/passport-local  --scope server --dev --no-bootstrap
$ npx lerna bootstrap
```

start by generating an `AuthModule` and in it, an `AuthService`

```shell
# create auth module and service
$ cd packages/server/
$ nest g module auth
$ nest g service auth
$ cd ../..
```

as we implement the `AuthService`, we'll find it useful to encapsulate user operations in a `UsersService`, so let's generate that module and service now:

```shell
# create users module and service
$ cd packages/server/
$ nest g module users
$ nest g service users
$ cd ../..
```

replace the default contents of these generated files as shown below.

`packages/server/src/users/users.service.ts`

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

add `exports: [UsersService],` to `packages/server/src/users/users.module.ts`

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

`packages/server/src/auth/auth.service.ts`

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

`packages/server/src/auth/auth.module.ts`

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

`packages/server/src/auth/local.strategy.ts`

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

`packages/server/src/auth/auth.module.ts`

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

add `/api/login` to `packages/server/src/app.controller.ts`

```typescript
import { Controller, Get, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { AppService } from './app.service';
import { swaggerApiPath } from './env';
import express = require('express');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiExcludeEndpoint()
  redirectToApi(@Res() response: express.Response) {
    response.redirect(swaggerApiPath, HttpStatus.PERMANENT_REDIRECT);
  }

  @UseGuards(AuthGuard('local'))
  @Post(`/${swaggerApiPath}/login`)
  @ApiUseTags(swaggerModuleTagAuth)
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
$ npx lerna add @nestjs/jwt --scope server --no-bootstrap
$ npx lerna add passport-jwt --scope server --no-bootstrap
$ npx lerna add @types/passport-jwt  --scope server --no-bootstrap --dev
$ npx lerna bootstrap
```

> The `@nest/jwt` package (see more [here](https://github.com/nestjs/jwt)) is a utility package that helps with **JWT manipulation**.
> The `passport-jwt` package is the Passport package that **implements the JWT strategy** and `@types/passport-jwt` provides the TypeScript type definitions.

update `packages/server/src/auth/auth.service.ts` with `/api/login` route

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

add `packages/server/src/auth/constants.ts`

```typescript
const jwtSecret = process.env.JWT_SECRET = 'secretKey';
const jwtExpiresIn = process.env.JWT_EXPIRES_IN = '60s';

export const jwtConstants = {
  secret: jwtSecret,
  expiresIn: jwtExpiresIn,
};
```

add to `.env` `JWT_SECRET` env variable ex `JWT_SECRET=uKxHrE431MRgYoI8G6JKePsKhQ71kdZX`

now update `packages/server/src/auth/auth.module.ts` with

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

add interface `packages/server/src/auth/types/jwt-payload.interface.ts`

```typescript
export interface JwtPayload {
  exp: number;
  iat: number;
  sub: string | number;
  username: number;
}
```

`packages/server/src/auth/jwt.strategy.ts`

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

update `packages/server/src/app.controller.ts` adding `/me` routte

```typescript
  ...
  @UseGuards(AuthGuard('jwt'))
  @ApiUseTags(swaggerModuleTagAuth)
  @Get(`/${swaggerApiPath}/me`)
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

add `PassportModule.register({ defaultStrategy: 'jwt' }` to `packages/server/src/auth/auth.module.ts` imports

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

add to `packages/server/src/participant/participant.module.ts` and `packages/server/src/person/person.module.ts`

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

`packages/server/src/app.controller.ts`
`packages/server/src/person/person.controller.ts`
`packages/server/src/participant/participant.controller.ts`

```typescript
@ApiBearerAuth()
@UseGuards(AuthGuard())
...
@ApiUnauthorizedResponse({ description: r.API_RESPONSE_UNAUTHORIZED })
```

### Authentication: Finish App controller Login and Profile routes

first add some DTO's

`packages/server/src/auth/dto/index.ts`

```typescript
export * from './login-user.dto';
```

`packages/server/src/auth/dto/login-user.dto.ts`

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

`packages/server/src/auth/dto/login-user-response.dto.ts`

```typescript
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserResponseDto {
  @ApiModelProperty()
  @IsString()
  readonly accessToken: string;
}
```

`packages/server/src/auth/dto/get-profile-response.dto.ts`

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

add all decorators and dto's to routes in `packages/server/src/app.controller.ts`

```typescript
  ...
  @Post(`/${swaggerApiPath}/login`)
  @ApiUseTags(swaggerModuleTagAuth)
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ title: r.API_OPERATION_AUTH_LOGIN })
  @ApiCreatedResponse({ description: r.API_RESPONSE_LOGIN, type: LoginUserResponseDto })
  @ApiInternalServerErrorResponse({ description: r.API_RESPONSE_INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: r.API_RESPONSE_UNAUTHORIZED })
  async login(@Request() req, @Body() loginUserDto: LoginUserDto) {
    return this.authService.login(req.user);
  }

  @Get(`/${swaggerApiPath}/me`)
  @ApiUseTags(swaggerModuleTagAuth)
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

note for: `@Body() createPersonDto` to `packages/server/src/app.controller.ts`, require to have the object in swagger parameters

### Authentication: Test Swagger With Authentication

1. enter <https://localhost:3443/api>
2. expand auth swagger tag
3. fire login request with `{ "username": "john", "password": "changeme" }`
4. copy `accessToken` to clipboard
5. click **authorize** button or **lock icon** and add 'Bearer PASTE-JWT-HERE'
6. fire get profile request. or other protected resource

done.....we have proptected api and use it in swagger

> tip: if usign curl, and are using a self-signed certificate use `curl` with `-k` flag to -k or --insecure to allow insecure server connections when using SSL, else we have the classical response

```
curl failed to verify the legitimacy of the server and therefore could not
establish a secure connection to it. To learn more about this situation and
how to fix it, please visit the web page mentioned above.
```
