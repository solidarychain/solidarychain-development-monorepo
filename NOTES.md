# NOTES

## Links

- [Convector with NestJS](https://medium.com/swlh/convector-with-nestjs-7e660322d927)
- [Final Example](https://github.com/mahcr/convector-example-people-attributes)

## Commands

```shell
# run dev
npx lerna run start:dev --scope server --stream
# debug
npx lerna run start:debug --scope server --stream
```

## Uris and Endpoints

- <http://localhost:5084/_utils/#database/>
- <http://localhost:3000/participant/>
- <http://localhost:3000/person/>

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

### commit project

```shell
$ git add . && git commit -am "finished tutorial"
```

### add Types to `Participant` and `Person` Modules and Use it

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
# get participant person (chain)
$ curl http://localhost:3000/participant/gov | jq

# create participant (chain)
$ curl -X POST \
  http://localhost:3000/participant \
  -H 'Content-Type: application/json' \
  -d '{
    "id":"sol",
    "name": "Solidarity Organization"
  }'


# create person (chain)
$ curl -X POST \
  http://localhost:3000/person \
  -H 'Content-Type: application/json' \
  -d '{
    "id":"1-100-104",
    "name": "Jane Doe"
  }'

# get person (chain)
$ curl http://localhost:3000/person/1-100-103 | jq

# get all persons (worldstate/couchdb)
$ curl http://localhost:3000/person | jq

# addAttribute
$ curl -X POST \
  http://localhost:3000/person/1-100-103/add-attribute \
  -H 'Content-Type: application/json' \
  -d '{
    "attributeId":"birth-date",
    "content": "1971"
  }' | jq

# getByAttribute
$ curl -X POST \
  http://localhost:3000/person/birth-date/get-attribute \
  -H 'Content-Type: application/json' \
  -d '{
    "value": "1971"
  }' | jq
```

## ToDo

debug smartContract
