# README

## Description

A minimal React Hooks typescript frontend, with **JWT Auth** using **hyperledger network** and **person chaincode** person users, consuming `server-graphql` project, with `apollo/react-hooks`, `react-router` and other cool stuff, ready to use has a base starter for hyperledger/convector/server-graphql

- login/logout and auto refresh jwt token
- react routes
- some graphql requests like person profile, and list of persons on ledger
- some state

## Pre-Requisites

1. Node Js

2. this project must have a running hurley hyperledger network running, with **person chaincode** deployed, follow instructions on [README.me](../../README.md)

3. this project must have a running server-graphql [README.me](../server-graphql/README.md)

## Configure environment variables

default `.env`

```conf
# react env variables must be prefixed by REACT_APP_
REACT_APP_REST_SERVER_URI=https://localhost:3443
REACT_APP_GRAPHQL_SERVER_URI=https://localhost:3443/graphql

# Apollo
REACT_APP_APOLLO_FETCH_POLICY=network-only
REACT_APP_APOLLO_REJECT_UNAUTHORIZED=false

# require to prevent problems with create-react-app and "jest": "24.9.0"
SKIP_PREFLIGHT_CHECK=true
# NODE_TLS_REJECT_UNAUTHORIZED=0
# HTTPS=true
```

## Start React Frontend

```shell
# generate graphql types/ everytime we change .graphql files
$ npx lerna run gen:graphql --scope @convector-sample/frontend-react

# run react frontend
npx lerna run start --scope @convector-sample/frontend-react --stream
```

## Now play with Frontend

1. login with default user johndoe/12345678, or other user created with graphql or hurley

2. 