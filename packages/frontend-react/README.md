# README

## Description

A minimal React Hooks typescript frontend, with **JWT Auth** using **hyperledger network** and **person chaincode** person users, consuming `server-graphql` project, with `apollo/react-hooks`, `react-router` and other cool stuff, ready to use has a base starter for hyperledger/convector/server-graphql

- login/logout and auto refresh jwt token
- react routes
- some graphql requests like person profile, and list of persons on ledger
- some context state

## Pre-Requisites

1. Node Js

2. this project must have a running hurley hyperledger network running, with **person chaincode** deployed, follow instructions on [README.me](../../README.md)

> tip: use `restartEnv.sh` script

3. this project must have a running server-graphql [README.me](../server-graphql/README.md)

> tip: use `npx lerna run start:prod --scope @convector-sample/server-graphql --stream`

## Configure environment variables

default `.env` config

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
```

## Configure IP and CORS

> if running frontend from other ip/fqdn than default `localhost:3000`, first you must configure both frontend and graphql server `.env` to your own needs, in below example we use a ip `192.168.1.133` has a example, can be a fqnd like `example.com` etc

```shell
# edit frontend .env
$ nano packages/frontend-react/.env
```

and change `REACT_APP_REST_SERVER_URI` and `REACT_APP_GRAPHQL_SERVER_URI`, we enable https to...

```conf
# react env variables must be prefixed by REACT_APP_
REACT_APP_REST_SERVER_URI=https://192.168.1.133:3443
REACT_APP_GRAPHQL_SERVER_URI=https://192.168.1.133:3443/graphql

...

# require to prevent problems with create-react-app and "jest": "24.9.0"
SKIP_PREFLIGHT_CHECK=true
NODE_TLS_REJECT_UNAUTHORIZED=0
HTTPS=true
```

change graphql `.env` else we have cors and other problems, using same example of a machine with ip `192.168.1.133`

```shell
# edit backend .env
$ nano packages/server-graphql/.env
```

change `CORS_ORIGIN_REACT_FRONTEND`

```conf
...
# required to define when we don't use default origin http://localhost:3000
CORS_ORIGIN_REACT_FRONTEND=https://192.168.1.133:3000
```

## Start React Frontend

```shell
# generate graphql types/ every time we change .graphql files, or first time after cloned the project
$ npx lerna run gen:graphql --scope @convector-sample/frontend-react

# run react frontend
$ npx lerna run start --scope @convector-sample/frontend-react --stream
# output
@convector-sample/frontend-react: Starting the development server...
@convector-sample/frontend-react: Files successfully emitted, waiting for typecheck results...
@convector-sample/frontend-react: Compiled successfully!
@convector-sample/frontend-react: You can now view @convector-sample/frontend-react in the browser.
@convector-sample/frontend-react:   Local:            https://localhost:3000/
@convector-sample/frontend-react:   On Your Network:  https://192.168.1.133:3000/
@convector-sample/frontend-react: Note that the development build is not optimized.
@convector-sample/frontend-react: To create a production build, use npm run build.
```

## Now play with Frontend

goto <https://localhost:3443> or <https://192.168.1.133:3443/graphql>

1. login with default user `johndoe`, password `12345678`, or other ledger user created with `rest server`, `graphql server` or `hurley`

done