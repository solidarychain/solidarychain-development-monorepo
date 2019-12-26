# README

## Description

GraphQL based on [Nest](https://github.com/nestjs/nest) framework, with `type-graphql` and other cool stuff

## Pre-Requisites

1. Node Js

2. this project must have a running hurley hyperledger network running, with **person chaincode** deployed, follow instructions on [README.me](../../README.md)

## Configure environment variables

default `.env`

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
```

## Start GraphQL Api

```shell
# in repo root folder

# run in prod mode
$ npx lerna run start:prod --scope @convector-sample/server-graphql --stream
# run in dev mode
$ npx lerna run start:dev --scope @convector-sample/server-graphql --stream
# or run in debug mode
$ npx lerna run start:debug --scope @convector-sample/server-graphql --stream
# output
@convector-sample/server-rest: [Nest] 13860   - 2019-12-25 21:15:15   HTTP Server running on port [3080] +19ms
@convector-sample/server-rest: [Nest] 13860   - 2019-12-25 21:15:15   HTTPS Server running on port [3443] +1ms
```