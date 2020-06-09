## DOCKER Notes / Dockerize app

- [Deploying Lerna Web Apps with Docker](https://versatile.nl/blog/deploying-lerna-web-apps-with-docker)

## Start build Image

```shell
# build server-graphql image
$ npm run pkg:graphql:docker:build
```

## Fix Problems with build native modules : stack Error: Could not find any Python installation to use

- [node:7.9-alpine unable to build package due python is not installed](https://github.com/nodejs/docker-node/issues/384)

Python is not set from command line or npm configuration
@rwillians I have solved building native modules on alpine by adding the following to the Dockerfile

```shell
# require to buil native modules on alpine
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet node-gyp -g &&\
  npm install --quiet && \
  apk del native-deps
```






Hello Guys
I'm build my graphql backend images, based on convector and I'm try to map volumes to
/home/${USER}/hyperledger-fabric-network files
but it seems some stuff is hardcoded, anyone with experience on building docker images with convector?
like build backend images with a production network (non hurley)
thanks in advance



to start debug I map 
```
volumes:
  /home/mario/hyperledger-fabric-network:/home/mario/hyperledger-fabric-network/
```
but seems that  /home/mario/ prefix is hardcoded somewhere, 
example
```
Error: Failed to read or parse the network profile at '/root/hyperledger-fabric-network/network-profiles/org1.network-profile.yaml', Error: ENOENT: no such file or directory, open '/root/hyperledger-fabric-network/network-profiles/org1.network-profile.yaml'
```
I try find project for 'org1.network-profile.yaml' for ex and the only files that use it are in root of project
```
org1.transaction.config.json
chaincode.config.json
```


[NetworkConfig101.js]: NetworkConfig101 - problem reading the PEM file :: Error: ENOENT: no such file or directory, open '/home/mario/hyperledger-fabric-network/artifacts/crypto-config/peerOrganizations/org1.hurley.lab/ca/ca.org1.hurley.lab-cert.pem'



------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

map file

my network dont have yet a certificateAuthorities, this is needed for convector to work?

    certificateAuthorities:
      - ca.org1.hurley.lab

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

are need, or are need just to build chaincode?
org1.transaction.config.json
chaincode.config.json

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


MV


go to 
crypto-config/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp

MAPPED
crypto-config/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/keystore/8f035006470dc018529d4ce9133ad7364ad0a3ede4bd920ebfa1d0f534d23a23_sk
/home/mario/hyperledger-fabric-network/.hfc-org1/user1

crypto-config/ordererOrganizations/example.com/users/Admin@example.com/msp/keystore/ea510300a3cfc18ecf7743abc38c5a2eb7ba4e19368bb688687122307610dfab_sk
/home/mario/hyperledger-fabric-network/.hfc-org1/admin



scp registerIdentitiesManager.js vm.swarm4:/tmp
node registerIdentitiesManager.js



how can I register registerIdentitiesManager.js in production network ?

do you have deployed your network with what: frontend, backend and with docker images?




https://github.com/instamed/healthcare-payments-blockchain/blob/master/packages/administration/enroll.js
it's fabric-client enrolling two users, user1 and admin
you can enroll your own user using above file and it will give you all three files

wait they had a better one
wait a minute




here
[03:08]
https://github.com/worldsibu/convector-identity-patterns/blob/master/packages/administrative/registerIdentitiesManager.js





{
  "channels": ["ch1", "ch2"],
  "topology": {
    "org1": {
      "channels": ["ch1"],
      "users": ["John", "Mike"]
    },
    "org2": {
      "channels": ["ch2"],
      "users": ["Jane"]
    },
    "org3": {
      "channels": ["ch2", "ch1"],
      "users": ["Henry"]
    }
  }
}
hurl new -n ./hurley-network-topology.json -p $(pwd)/hurley-network-topology

.hfc-org1, .hfc-org2, .hfc-org3, .hfc-org4, .hfc-org5

2020-06-07 14:26:32.329 UTC [channelCmd] update -> INFO 04f Successfully submitted channel update
Registering admin for org1
Registering admin for org2
Registering admin for org3
Registering admin for org4
Registering admin for org5
Registering User1 for org1
Registering User2 for org1
Registering User1 for org2
Registering User2 for org2
Registering User1 for org3
Registering User2 for org3
Registering User1 for org4
Registering User2 for org4
Registering User1 for org5
Registering User2 for org5

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


open project
/media/mario/Storage/Documents/Development/HyperLedger/fabric-samples/fabcar/javascript
/media/mario/Storage/Documents/Development/HyperLedger/fabric-samples/first-network/connection-org1.json
/media/mario/Storage/Documents/Development/HyperLedger/fabric-samples/first-network/connection-org1.yaml

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


