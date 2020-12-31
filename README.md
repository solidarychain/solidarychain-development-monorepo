# READ ME: @solidary-chain : starters

- [READ ME: @solidary-chain : starters](#read-me-solidary-chain--starters)
  - [Description](#description)
  - [Collaborate to the Convector Suite projects](#collaborate-to-the-convector-suite-projects)
  - [Advice Read Links](#advice-read-links)
    - [Covalent Links](#covalent-links)
    - [Docker Links](#docker-links)
    - [Node Links](#node-links)
    - [HyperLedger Fabric](#hyperledger-fabric)
    - [StackOverflow](#stackoverflow)
  - [Install virtual machine and Pre Requisites](#install-virtual-machine-and-pre-requisites)
    - [1. Install VM](#1-install-vm)
    - [2. Connect to VM via SSH](#2-connect-to-vm-via-ssh)
    - [3. Install Docker and Docker Compose](#3-install-docker-and-docker-compose)
    - [4. Install Node.js and NVM](#4-install-nodejs-and-nvm)
    - [5. Install HyperLedger Fabric](#5-install-hyperledger-fabric)
    - [6. Install covalent Convector cli tooling](#6-install-covalent-convector-cli-tooling)
    - [7. Clone repository](#7-clone-repository)
  - [Hurley hyperledger network](#hurley-hyperledger-network)
    - [Install global cli tools Lerna and typescript](#install-global-cli-tools-lerna-and-typescript)
    - [Install lerna packages dependencies](#install-lerna-packages-dependencies)
      - [error#1](#error1)
    - [Start hurley hyperledger network](#start-hurley-hyperledger-network)
    - [Inspect running network containers](#inspect-running-network-containers)
    - [Invoke chaincode with help of hurley](#invoke-chaincode-with-help-of-hurley)
  - [packages/common](#packagescommon)
  - [packages/participant-cc](#packagesparticipant-cc)
  - [packages/person-cc](#packagesperson-cc)
  - [packages/server-graphql](#packagesserver-graphql)
  - [packages/frontend-react](#packagesfrontend-react)
  - [Done](#done)
  - [Modified .env files to work with vm 192.168.1.133](#modified-env-files-to-work-with-vm-1921681133)

## Description

this repo contains a hurley/convector hyperledger network, based on [Covalent: Convector Tutorial - Smart Contract](https://docs.worldsibu.com/article/89-tutorial), with some additional lerna packages/projects, **two backend versions, node/rest and nestjs/graphql versions**, and a minimal react-hooks frontend with login/logout, jwt, with refresh-token, context state etc, based on person convector chaincode. This useful to start rest or graphql based apps, with minimal stuff implemented.

- [GraphQL Server](#packagesserver-graphql)
- [React Frontend](#packagesfrontend-react)

> Check all the information to work with [Convector](https://worldsibu.github.io/convector) in the [DOCS site](https://docs.worldsibu.com)

## Collaborate to the Convector Suite projects

- [Discord chat with the community](https://discord.gg/twRwpWt)
- [Convector projects](https://github.com/worldsibu)

## Advice Read Links

> tip: we advice to read [Covalent Links](#covalent-links) links, before follow this readme, and spin of the network, and projects

### Covalent Links

- [Convector](https://docs.covalentx.com/collection/6-convector)
- [Convector Suite : Getting Started](https://docs.covalentx.com/article/71-getting-started)
- [Tutorials](https://docs.covalentx.com/article/123-tutorials)
- [Tutorial - Getting Started](https://docs.covalentx.com/article/99-tutorial-getting-started)
- [Tutorial - Smart Contract](https://docs.covalentx.com/article/89-tutorial)
- [Tutorial - Back end](https://docs.covalentx.com/article/95-tutorial-back-end)
- [Convector Suite: Install on Ubuntu](https://docs.covalentx.com/article/120-install-on-ubuntu)
- [Learn Hurley](https://docs.covalentx.com/article/71-getting-started#learn-hurley)

### Docker Links

- [Get Docker Engine - Community for Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)

### Node Links

- [NodeJs](https://nodejs.org/en/)
- [How to Install Node.js and NPM on Ubuntu 18.04](https://www.hostinger.com/tutorials/how-to-install-node-ubuntu)
- [NVM Installation and Update](https://github.com/nvm-sh/nvm#installation-and-update)

### HyperLedger Fabric

- [Prerequisites](https://hyperledger-fabric.readthedocs.io/en/latest/prereqs.html)
- [Building Your First Network](https://hyperledger-fabric.readthedocs.io/en/latest/build_network.html)

### StackOverflow

- [convector](https://stackoverflow.com/questions/tagged/convector)
- [hyperledger](https://stackoverflow.com/questions/tagged/hyperledger)

## Install virtual machine and Pre Requisites

> note: you can use your development machine like me, this steps is just for guys that want to work with a clean machine

### 1. Install VM

Install a virtual machine with `ubuntu server 18.04` with `openssh` server installed, or other linux based machine, with a minimal of **20GB**, recommended **30GB** to prevent out of space problems, I have to resize my virtual disk 2 times.....

### 2. Connect to VM via SSH

```shell
$ ssh ${YOUR-VM-IP}
```

### 3. Install Docker and Docker Compose

```shell
# update and install deps
$ sudo apt update && \
  sudo apt install \
  apt-transport-https \
  ca-certificates \
  curl \
  gnupg-agent \
  software-properties-common -y
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
$ sudo apt update
$ sudo apt install docker-ce -y
$ sudo usermod -aG docker ${USER} && newgrp docker
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
# get versions
$ docker -v
Docker version 19.03.5, build 633a0ea838
$ docker-compose -v
docker-compose version 1.25.0, build 0a186604
```

### 4. Install Node.js and NVM

> recommended hyperledger/convector node version `v8.16.0`

```shell
# install node and npm
$ sudo apt install nodejs npm -y
# install nvm
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
# allow nvm to be used from your user’s bash profile
$ source ~/.profile
# install recommended version with nvm
$ nvm install v8.16.0
v8.16.0 is already installed.
Now using node v8.16.0 (npm v6.4.1)
$ node -v
v8.16.0
```

### 5. Install HyperLedger Fabric

```shell
# Prerequisites
$ sudo apt install git golang python -y
# Install HyperLedger
$ curl -sSL https://bit.ly/2ysbOFE | bash -s
hyperledger/fabric-javaenv     1.4.4               4648059d209e        5 weeks ago         1.7GB
hyperledger/fabric-javaenv     latest              4648059d209e        5 weeks ago         1.7GB
hyperledger/fabric-ca          1.4.4               62a60c5459ae        5 weeks ago         150MB
hyperledger/fabric-ca          latest              62a60c5459ae        5 weeks ago         150MB
hyperledger/fabric-tools       1.4.4               7552e1968c0b        5 weeks ago         1.49GB
hyperledger/fabric-tools       latest              7552e1968c0b        5 weeks ago         1.49GB
hyperledger/fabric-ccenv       1.4.4               ca4780293e4c        5 weeks ago         1.37GB
hyperledger/fabric-ccenv       latest              ca4780293e4c        5 weeks ago         1.37GB
hyperledger/fabric-orderer     1.4.4               dbc9f65443aa        5 weeks ago         120MB
hyperledger/fabric-orderer     latest              dbc9f65443aa        5 weeks ago         120MB
hyperledger/fabric-peer        1.4.4               9756aed98c6b        5 weeks ago         128MB
hyperledger/fabric-peer        latest              9756aed98c6b        5 weeks ago         128MB
hyperledger/fabric-zookeeper   0.4.18              ede9389347db        7 weeks ago         276MB
hyperledger/fabric-zookeeper   latest              ede9389347db        7 weeks ago         276MB
hyperledger/fabric-kafka       0.4.18              caaae0474ef2        7 weeks ago         270MB
hyperledger/fabric-kafka       latest              caaae0474ef2        7 weeks ago         270MB
hyperledger/fabric-couchdb     0.4.18              d369d4eaa0fd        7 weeks ago         261MB
hyperledger/fabric-couchdb     latest              d369d4eaa0fd        7 weeks ago         261MB
```

### 6. Install covalent Convector cli tooling

```shell
# install cli tools
$ sudo npm i -g @worldsibu/hurley @worldsibu/convector-cli
$ hurl -V
1.1.2
$ conv -V
1.1.7
```

### 7. Clone repository

```shell
$ cd ~
$ git clone https://gitlab.koakh.com/koakh/node-nestjs-hyperledger-convector-starter.git
$ cd node-nestjs-hyperledger-convector-starter
```

## Hurley hyperledger network

### Install global cli tools Lerna and typescript

```shell
# install lerna and typescript
$ sudo npm i -g lerna typescript
# check versions
$ tsc -v
Version 3.7.4
$ lerna -v
3.19.0
```

### Install lerna packages dependencies

```shell
# first build -cc library: this is required on fresh clones before lerna bootstrap, to prevent the below error#1 Cannot find module '@solidary-chain/common-cc'
$ npx lerna run build --scope @solidary-chain/common-cc --stream
# install dependencies, this will trigger lerna bootstrap
$ npm i
```

#### error#1

```shell
src/participant.controller.ts:1:35 - error TS2307: Cannot find module '@solidary-chain/common-cc'.
1 import { appConstants as c } from '@solidary-chain/common-cc';
```

### Start hurley hyperledger network

first things first, to start play with convector and chaincodes we must spin up a **hyperledger network** with the help of [hurley](https://docs.covalentx.com/category/87-hurley)

and some helper script `restartEnv.sh`, that can be used to start or restart **hyperledger network**

```shell
# launch restart network
$ ./restartEnv.sh
# in the end we get one valid transaction like this
[hurley] - Result: {"_attributes":[{"certifierID":"gov","content":null,"id":"birth-year","issuedDate":1554239270}],"_email":"john.doe@example.com","_firstname":"John","_id":"1-100-100","_lastname":"Doe","_participant":{"id":"gov","identities":[{"fingerprint":"72:BA:6B:03:89:E9:F9:CE:53:AB:14:D0:90:13:3B:A8:DC:99:C2:81","status":true}],"msp":"org1MSP","name":"Big Government","type":"com.chain.solidary.model.participant"},"_password":"$2b$10$H2l30bMr5dhCVNg53M/0BeHrgSh7rdHUokfrQi0HMs.H509MpCs/S","_roles":["USER"],"_type":"com.chain.solidary.model.person","_username":"johndoe"}
Cleaning up event hubs
```

> tip: wait a few minutes to download docker images and spin up network, you can watch script logs to learn what's happen

> tip: this first call takes some seconds as it provision the containers needed to run the **smart contract**

> tip: you can inspect `restartEnv.sh`, `seed.sh` and `views/install.sh` scripts to know what is done behind the scene

### Inspect running network containers

```shell
# check containers
$ docker container ls --format "table {{.ID}}\t{{.Names}}\t{{.Status}}\t{{.Ports}}"

CONTAINER ID        NAMES                                  STATUS              PORTS

# chaincode containers from org1 and org2
a3354d1b9019        dev-peer0.org2.hurley.lab-solidary-chain-1.0   Up 3 minutes        
d59a8cc0ef61        dev-peer0.org1.hurley.lab-solidary-chain-1.0   Up 5 minutes        

# all the other peer, orderer, ca and couch containers
1dfc5a1b2c0a        peer0.org2.hurley.lab                  Up 7 minutes        0.0.0.0:7151->7051/tcp, 0.0.0.0:7152->7052/tcp, 0.0.0.0:7153->7053/tcp
8338c8764a68        peer0.org1.hurley.lab                  Up 7 minutes        0.0.0.0:7051-7053->7051-7053/tcp
a13a6b71d809        couchdb.peer0.org2.hurley.lab          Up 7 minutes        4369/tcp, 9100/tcp, 0.0.0.0:5184->5984/tcp
9e8803591b17        orderer.hurley.lab                     Up 8 minutes        0.0.0.0:7050->7050/tcp
0deea360de99        ca.org1.hurley.lab                     Up 8 minutes        0.0.0.0:7054->7054/tcp
b37929f7bfc0        couchdb.peer0.org1.hurley.lab          Up 7 minutes        4369/tcp, 9100/tcp, 0.0.0.0:5084->5984/tcp
c785e4667b02        ca.org2.hurley.lab                     Up 8 minutes        0.0.0.0:7154->7054/tcp
```

### Invoke chaincode with help of hurley

```shell
# test/invoke person chaincode (person-cc and participant-cc)
$ npx hurl invoke person person_get 1-100-100
# output
[hurley] - 1-100-100
[hurley] - Sending transaction as user1 in org org1...
[hurley] - Transaction sent! VALID  SUCCESS a824d0a4cd66ed776f6b6ea1ed30a89a76d8d5672b2a482cd0ab00526ec85b49
[hurley] - Result: {"_attributes":[{"certifierID":"gov","content":null,"id":"birth-year","issuedDate":1554239270}],"_email":"john.doe@example.com","_firstname":"John","_id":"1-100-100","_lastname":"Doe","_participant":{"id":"gov","identities":[{"fingerprint":"72:BA:6B:03:89:E9:F9:CE:53:AB:14:D0:90:13:3B:A8:DC:99:C2:81","status":true}],"msp":"org1MSP","name":"Big Government","type":"com.chain.solidary.model.participant"},"_password":"$2b$10$H2l30bMr5dhCVNg53M/0BeHrgSh7rdHUokfrQi0HMs.H509MpCs/S","_roles":["USER"],"_type":"com.chain.solidary.model.person","_username":"johndoe"}
Cleaning up event hubs

$ npx hurl invoke person participant_get gov
# output
[hurley] - gov
[hurley] - Sending transaction as user1 in org org1...
[hurley] - Transaction sent! VALID  SUCCESS dda818b7ea77022bdb62c44c0375ee2898307a2cbf7e5968489b63d15e21b90a
[hurley] - Result: {"_id":"gov","_identities":[{"fingerprint":"72:BA:6B:03:89:E9:F9:CE:53:AB:14:D0:90:13:3B:A8:DC:99:C2:81","status":true}],"_msp":"org1MSP","_name":"Big Government","_type":"com.chain.solidary.model.participant"}
Cleaning up event hubs
```

everything seems working has expected

## packages/common

a common package to share some code in person chaincodd, `person-cc` and `participant-cc` packages,
with a `common.controller.ts`, `constants.ts`, `enums.ts` and `env.ts`

## packages/participant-cc

`participant-cc` chaincode to be deployed on hyperledger network

> tip: read [Convector Smart Contracts](https://docs.covalentx.com/category/74-convector-smart-contracts)

## packages/person-cc

`person-cc` chaincode to be deployed on hyperledger network

> tip: read [Convector Smart Contracts](https://docs.covalentx.com/category/74-convector-smart-contracts)

## packages/server-graphql

```shell
# start server-graphql with
$ npx lerna run start:dev --scope @solidary-chain/server-graphql --stream
```

> Note: for more info about project check [README.md](packages/server-graphql/README.md)

## packages/frontend-react

> Note: for more info about project check [README.md](packages/frontend-react/README.md)

## Done

ok we are done, if errors occur please contact me in on [Discord chat](https://discord.gg/twRwpWt) with nick **koakh**

thanks for all the awesome team of covalent

and sorry my english, it is not my native language

I have some `NOTES.md` in sub projects dirs, taken in this ride, some links, problem and solutions, maybe they can be useful for others....

## Modified .env files to work with vm 192.168.1.133

`packages/frontend-react/.env`

```conf
# CRA: use HTTPS
HTTPS=true

# react env variables must be prefixed by REACT_APP_
REACT_APP_REST_SERVER_URI=https://192.168.1.133:3443
REACT_APP_GRAPHQL_SERVER_URI=https://192.168.1.133:3443/graphql

# Apollo
REACT_APP_APOLLO_FETCH_POLICY=network-only
REACT_APP_APOLLO_REJECT_UNAUTHORIZED=false

# require to prevent problems with create-react-app and "jest": "24.9.0"
SKIP_PREFLIGHT_CHECK=true

NODE_TLS_REJECT_UNAUTHORIZED=0
```

`packages/server-graphql/.env`

```conf
# HTTP_SERVER_PORT=3001
HTTPS_SERVER_PORT=3443
ACCESS_TOKEN_JWT_SECRET=rGtqzOjlW9OG47ncUKbPDltTxA3EtZFp
REFRESH_TOKEN_JWT_SECRET=3XgiizDr35A4H1I9ocOPTFeUkFSfKkSy

# debug, higher expires time out: use 15s | 1d to debug refreshToken
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
# use only in development mode to skip increment tokenVersion
REFRESH_TOKEN_SKIP_INCREMENT_VERSION=true

# required to define when we don't use default origin http://localhost:3000
CORS_ORIGIN_REACT_FRONTEND=https://192.168.1.133:3000
```

> NOTE: ALL Paswords and Secrets like `ACCESS_TOKEN_JWT_SECRET` in every files like `.env` are not used in production, feel free to try to use it, are exposed only has a example