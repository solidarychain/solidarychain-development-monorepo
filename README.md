# READ ME

- [READ ME](#read-me)
  - [Description](#description)
  - [Collaborate to the Convector Suite projects](#collaborate-to-the-convector-suite-projects)
  - [Advice Read Links](#advice-read-links)
    - [Covalent Links](#covalent-links)
    - [Docker Links](#docker-links)
    - [Node Links](#node-links)
    - [HyperLedger Fabric](#hyperledger-fabric)
  - [Install virtual machine and Pre Requisites](#install-virtual-machine-and-pre-requisites)
    - [1. Install VM](#1-install-vm)
  - [2. Connect to VM via SSH](#2-connect-to-vm-via-ssh)
    - [2. Install Docker and Docker Compose](#2-install-docker-and-docker-compose)
    - [3. Install Node.js and NVM](#3-install-nodejs-and-nvm)
    - [3. Install HyperLedger Fabric](#3-install-hyperledger-fabric)
    - [4. Install Convalent Convector Tooling](#4-install-convalent-convector-tooling)
  - [Hurley hyperledger network](#hurley-hyperledger-network)
    - [Start hurley hyperledger network](#start-hurley-hyperledger-network)
    - [Inspect running network containers](#inspect-running-network-containers)
  - [packages/common](#packagescommon)
  - [packages/participant-cc](#packagesparticipant-cc)
  - [packages/person-cc](#packagesperson-cc)
  - [packages/server-rest](#packagesserver-rest)
    - [run rest api server](#run-rest-api-server)
  - [packages/server-graphql](#packagesserver-graphql)
  - [packages/frontend-react](#packagesfrontend-react)

## Description

this repo contains a hurley/convector hyperledger network, based on [Covalent: Convector Tutorial - Smart Contract](https://docs.worldsibu.com/article/89-tutorial), with some additional lerna packages/projects, two backend versions, node/rest and nestjs/graphql versions, and a minimal react frontend with login jwt based on person chaincode

> Check all the information to work with [Convector](https://worldsibu.github.io/convector) in the [DOCS site](https://docs.worldsibu.com)

## Collaborate to the Convector Suite projects

- [Discord chat with the community](https://discord.gg/twRwpWt)
- [Convector projects](https://github.com/worldsibu)

## Advice Read Links

> tip: we advice to follow bellow links, before follow this readme, and spin of the network, and projects

### Covalent Links

- [Covalent: Convector](https://docs.covalentx.com/collection/6-convector)
- [Covalent: Convector Suite : Getting Started](https://docs.covalentx.com/article/71-getting-started)
- [Covalent: Tutorials](https://docs.covalentx.com/article/123-tutorials)
- [Covalent: Tutorial - Getting Started](https://docs.covalentx.com/article/99-tutorial-getting-started)
- [Covalent: Tutorial - Smart Contract](https://docs.covalentx.com/article/89-tutorial)
- [Covalent: Tutorial - Back end](https://docs.covalentx.com/article/95-tutorial-back-end)
- [Covalent: Convector Suite: Install on Ubuntu](https://docs.covalentx.com/article/120-install-on-ubuntu)

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

## Install virtual machine and Pre Requisites

> note: you can use your development machine like me, this steps is just for guys that want to work with a clean machine

### 1. Install VM

Install a virtual machine with `ubuntu server 18.04` with `openssh` server installed, or other linux based machine

## 2. Connect to VM via SSH

```shell
$ ssh 192.168.1.133
```

### 2. Install Docker and Docker Compose

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

### 3. Install Node.js and NVM

> IMPORTANT NOTE: recommended node version `v8.16.0`

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

### 3. Install HyperLedger Fabric

```shell
# Prerequisites
$ sudo apt install git golang python -y
# Install HyperLedger
$ curl -sSL https://bit.ly/2ysbOFE | bash -s
```

### 4. Install Convalent Convector Tooling

```shell
$ npm i -g @worldsibu/hurley
$ npm i -g @worldsibu/convector-cli
```

## Hurley hyperledger network

### Start hurley hyperledger network

first things first, to start play with convector chaincode we must spin up a hyperledger network with the help of [hurley](https://docs.covalentx.com/category/87-hurley)

launch `restartEnv.sh`

```shell
# launch restart network
$ restartEnv.sh
```

or follow above commands

```bash
# Start your blockchain network and install the smart contract's `participant-cc` and `person-cc`
$ npm start

# Create some seed data to play with the project, participants, persons and some person attributes
$ npm run seed

# seed output
Creating participant: Big Government
[hurley] - gov
[hurley] - Big Government
[hurley] - Sending transaction as admin in org org1...
[hurley] - Transaction sent! VALID  SUCCESS 76e2ce57540945fac0fb837e40ad17b815b6cc7e96a1c002aab5469e319f2467
[hurley] - Result: {"type":"Buffer","data":[]}
...

# create couchbase views
$ ./views/install.sh
```

> Important: This first call takes some seconds as it provisions the containers needed to run the **smart contract**

> tip: you can inspect `seed.sh` script to know what is done behind the scene

### Inspect running network containers

```shell
# check containers
$ docker container ls --format "table {{.ID}}\t{{.Names}}\t{{.Status}}\t{{.Ports}}"

# test/invoke person chaincode (person-cc and participant-cc)
$ npx hurl invoke person person_get 1-100-100
$ npx hurl invoke person participant_get gov

# install package dependencies for all lerna packages
$ lerna bootstrap
```

## packages/common

a common package to share some code in `person-cc` and `participant-cc` chaincode,
with a `common.controller.ts`, `constants.ts`, `enums.ts` and `env.ts`

## packages/participant-cc

`participant-cc` chaincode to be deployed on hyperledger network

## packages/person-cc

`person-cc` chaincode to be deployed on hyperledger network

## packages/server-rest

rest api server

### run rest api server

> Note: for more info about project check [README.md](packages/server-rest/README.md)

## packages/server-graphql

> Note: for more info about project check [README.md](packages/server-graphql/README.md)

## packages/frontend-react

> Note: for more info about project check [README.md](packages/frontend-react/README.md)
