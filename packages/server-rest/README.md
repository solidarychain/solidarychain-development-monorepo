# README

- [README](#readme)
  - [Description](#description)
  - [Pre-Requisites](#pre-requisites)
  - [Configure environment variables](#configure-environment-variables)
  - [Start Rest Api](#start-rest-api)
  - [Get JWT Access Token](#get-jwt-access-token)
    - [POST:/api/login](#postapilogin)
  - [Test Rest API](#test-rest-api)
    - [Variables](#variables)
    - [GET:/api/me](#getapime)
    - [GET:/api/participant](#getapiparticipant)
    - [POST:/api/participant](#postapiparticipant)
    - [GET:/api/participant/{id}](#getapiparticipantid)
    - [GET:/api/person](#getapiperson)
    - [POST:/api/person](#postapiperson)
    - [GET:/api/person/{id}](#getapipersonid)
    - [POST:/api/person/{id}/add-attribute](#postapipersonidadd-attribute)
    - [POST:/api/person/{id}/get-attribute](#postapipersonidget-attribute)

## Description

Rest API based on [Nest](https://github.com/nestjs/nest) framework, with http redirect, https, swagger and jwt authentication

## Pre-Requisites

1. Node Js

2. this project must have a running hurley hyperledger network running, with **person chaincode** deployed, follow instructions on [README.me](../../README.md)

3. the great `jq` tool, in ubuntu/debian based distros use `$ sudo apt install jq -y`

## Configure environment variables

default `.env`

```conf
# example can be shared, not used in production
HTTP_SERVER_PORT=3080
HTTPS_SERVER_PORT=3444
ACCESS_TOKEN_JWT_SECRET=rGtqzOjlW9OG47ncUKbPDltTxA3EtZFp
REFRESH_TOKEN_JWT_SECRET=3XgiizDr35A4H1I9ocOPTFeUkFSfKkSy
AUTH_SERVICE_USE_MOKED_USERS=false
```

## Start Rest Api

```shell
# in repo root folder

# run in prod mode
$ npx lerna run start:prod --scope @convector-sample/server-rest --stream
# run in dev mode
$ npx lerna run start:dev --scope @convector-sample/server-rest --stream
# or run in debug mode
$ npx lerna run start:debug --scope @convector-sample/server-rest --stream
# output
@convector-sample/server-rest: [Nest] 13860   - 2019-12-25 21:15:15   HTTP Server running on port [3080] +19ms
@convector-sample/server-rest: [Nest] 13860   - 2019-12-25 21:15:15   HTTPS Server running on port [3444] +1ms
```

## Get JWT Access Token

- access swagger api at <https://localhost:3444/api>

to test some api endpoints, first we need a valid access token, use swagger endpoint `/api/login` with `LoginUserDto` payload `{ "username": "johndoe", "password": "12345678"}`

or below curl

### POST:/api/login

```shell
$ curl -k -s -X POST https://localhost:3444/api/login -d '{ "username": "johndoe", "password": "12345678"}' -H 'Content-Type: application/json' | jq

# response
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxLTEwMC0xMDAiLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE1NzczMDk3NDQsImV4cCI6MTU3NzMxMDY0NH0.n8L6j_1DDU4Rb0FoPoIAQJKCNaxRCgVSyMh-nkSRRjE"
}
```

if use swagger add `Bearer YOUR-ACCESS-TOKEN-HERE` and fire some queries

ex `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxLTEwMC0xMDAiLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE1NzczMDk3NDQsImV4cCI6MTU3NzMxMDY0NH0.n8L6j_1DDU4Rb0FoPoIAQJKCNaxRCgVSyMh-nkSRRjE`

## Test Rest API

### Variables

```shell
# define some variables
$ URI="https://localhost:3444"
# request token and assign it to variable with the help of jq
$ TOKEN=$(curl -k -s -X POST https://localhost:3444/api/login -d '{ "username": "johndoe", "password": "12345678"}' -H 'Content-Type: application/json' | jq -r ".accessToken"
)
```

### GET:/api/me

```shell
$ curl -k -s -X GET "${URI}/api/me" -H "accept: application/json" -H "Authorization: Bearer ${TOKEN}" | jq
```

```json
{
  "userId": "1-100-100",
  "username": "johndoe"
}
```

### GET:/api/participant

```shell
$ curl -k -s -X GET "${URI}/api/participant" -H "accept: application/json" -H "Authorization: Bearer ${TOKEN}" | jq
```

```json
[
  {
    "id": "gov",
    "type": "io.worldsibu.examples.participant",
    "name": "Big Government",
    "msp": "org1MSP",
    "identities": [
      {
        "fingerprint": "5B:1D:82:F7:93:6E:60:E7:6D:3D:D7:6E:8D:91:DB:E2:BF:67:03:07",
        "status": true
      }
    ]
  },
  ...
]
```

### POST:/api/participant

```shell
$ PAYLOAD="{ \"id\": \"unicef\", \"name\": \"Unicef\"}"
$ curl -k -s -X POST "${URI}/api/participant" -H "accept: application/json" -H "Authorization: Bearer ${TOKEN}" -H "Content-Type: application/json" -d "${PAYLOAD}"
```

### GET:/api/participant/{id}

```shell
$ ID=unicef
$ curl -k -s -X GET "${URI}/api/participant/${ID}" -H "accept: application/json" -H "Authorization: Bearer ${TOKEN}" | jq
```

```json
{
  "_id": "unicef",
  "_identities": [
    {
      "fingerprint": "54:F9:85:11:91:8F:81:F8:54:DB:25:CE:E6:0D:2C:8C:BB:7B:AD:7F",
      "status": true
    }
  ],
  "_msp": "org1MSP",
  "_name": "Unicef",
  "_type": "io.worldsibu.examples.participant"
}
```

### GET:/api/person

```shell
$ curl -k -s -X GET "${URI}/api/person" -H "accept: application/json" -H "Authorization: Bearer ${TOKEN}" | jq
```

```json
[
  {
    "id": "1-100-100",
    "type": "io.worldsibu.examples.person",
    "firstname": "John",
    "lastname": "Doe",
    "username": "johndoe",
    "password": "$2b$10$5SbuQ4vc.SBtbAA4PEGrHOBpBvuH3OsIhXPXa8qq5wb2fDs.whtvO",
    "email": "john.doe@mail.com",
    "attributes": [
      {
        "certifierID": "gov",
        "content": null,
        "id": "birth-year",
        "issuedDate": 1554239270
      }
    ],
    "roles": [
      "USER"
    ],
  ...
```

### POST:/api/person

```shell
$ PAYLOAD="{ \"id\": \"1-100-103\", \"firstname\": \"Rick\", \"lastname\": \"Doe\", \"username\": \"rickdoe\", \"password\": \"12345678\", \"email\": \"rick.doe@mail.com\" }"
$ curl -k -s -X POST "${URI}/api/person" -H "accept: application/json" -H "Authorization: Bearer ${TOKEN}" -H "Content-Type: application/json" -d "${PAYLOAD}"
```

```json
{"type":"Buffer","data":[]}
```

### GET:/api/person/{id}

```shell
$ ID=koakh
$ curl -k -s -X GET "${URI}/api/person/${ID}" -H "accept: application/json" -H "Authorization: Bearer ${TOKEN}" | jq
```

```json
{
  "id": "1-100-103",
  "type": "io.worldsibu.examples.person",
  "firstname": "Rick",
  "lastname": "Doe",
  "username": "rickdoe",
  "password": "$2b$10$.1unf8AGahW3ss.6NkFJsu1lIOUwg6oNGrgm4vGzSk3ztVaXlsn/i",
  "email": "rick.doe@mail.com",
  ...
```

### POST:/api/person/{id}/add-attribute

```shell
$ ID="1-100-103"
$ PAYLOAD='{ "attributeId":"born-year", "certifierID": "gov", "content": { "data": "1971", "work": true } }'
$ curl -k -s -X POST "${URI}/api/person/${ID}/add-attribute" -H "accept: application/json" -H "Authorization: Bearer ${TOKEN}" -H "Content-Type: application/json" -d "${PAYLOAD}" | jq
```

```json
  "id": "1-100-103",
  "firstname": "Rick",
  "lastname": "Doe",
  "username": "rickdoe",
  "email": "rick.doe@mail.com",
  "attributes": [
    {
      "id": "born-year",
      "content": {
        "data": "1971",
        "work": true
      },
      "issuedDate": 1577911309985,
      "expiresDate": null,
      "expired": null,
      "certifierID": "gov"
    }
...  
```

> Note: we can use any valid json object in `content`, this way we can have complex objects, but if one prefer string find in code `find #STRING-OR-OBJECT` and exchange object with string

### POST:/api/person/{id}/get-attribute

> search all persons with `ATTRIBUTE="born-year"` and `PAYLOAD='{ "value": { "data": "1971", "work": true } }'`

```shell
$ ATTRIBUTE="born-year"
$ PAYLOAD='{ "value": { "data": "1971", "work": true } }'
$ curl -k -s -X POST "${URI}/api/person/${ATTRIBUTE}/get-attribute" -H "accept: application/json" -H "Authorization: Bearer ${TOKEN}" -H "Content-Type: application/json" -d "${PAYLOAD}" | jq
```

```json
[
  {
    "_attributes": [
      {
        "certifierID": "gov",
        "content": {
          "data": "1971",
          "work": true
        },
        "id": "born-year",
        "issuedDate": 1554239270,
        "type": "io.worldsibu.examples.attribute"
      }
    ],
    "_email": "john.doe@mail.com",
    "_firstname": "John",
    "_id": "1-100-100",
    "_lastname": "Doe",
    "_participant": {
      "id": "gov",
...  
 {
    "_attributes": [
      {
        "certifierID": "gov",
        "content": {
          "data": "1971",
          "work": true
        },
        "id": "born-year",
        "issuedDate": 1577911309985,
        "type": "io.worldsibu.examples.attribute"
      }
    ],
    "_email": "mail@koakh.com",
    "_firstname": "Mario",
    "_id": "1-100-103",
    "_lastname": "Monteiro",
    "_participant": {
      "id": "gov",
...
]
```
