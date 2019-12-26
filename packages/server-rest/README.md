# README

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
HTTPS_SERVER_PORT=3443
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
@convector-sample/server-rest: [Nest] 13860   - 2019-12-25 21:15:15   HTTPS Server running on port [3443] +1ms
```

## Get JWT Access Token

- access swagger api at <https://localhost:3443/api>

to test some api endpoints, first we need a valid access token, use swagger endpoint `/api/login` with `LoginUserDto` payload `{ "username": "johndoe", "password": "12345678"}`

or below curl

### POST:/api/login

```shell
$ curl -k -s -X POST https://localhost:3443/api/login -d '{ "username": "johndoe", "password": "12345678"}' -H 'Content-Type: application/json' | jq

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
$ URI="https://localhost:3443"
# request token and assign it to variable with the help of jq
$ TOKEN=$(curl -k -s -X POST https://localhost:3443/api/login -d '{ "username": "johndoe", "password": "12345678"}' -H 'Content-Type: application/json' | jq -r ".accessToken"
)
```

### GET:/api/me

```shell
# /api/me
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
# /api/participant
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
  {
    "id": "mit",
    "type": "io.worldsibu.examples.participant",
    "name": "MIT",
    "msp": "org1MSP",
    "identities": [
      {
        "fingerprint": "A7:67:30:62:1C:81:30:4F:5C:53:84:3D:DE:47:0E:D0:24:AF:CE:AD",
        "status": true
      }
    ]
  },
  ...
]
```

### POST:/api/participant

```shell
# /api/participant
$ PAYLOAD="{ \"id\": \"unicef\", \"name\": \"Unicef\"}"
$ curl -k -s -X POST "${URI}/api/participant" -H "accept: application/json" -H "Authorization: Bearer ${TOKEN}" -H "Content-Type: application/json" -d "${PAYLOAD}"
```

```json
{"type":"Buffer","data":[]}
```

### GET:/api/participant/{id}

```shell
# /api/participant
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
$ curl -k -s -X GET "${URI}/api/person" -H "accept: application/json" -H "Authorization: Bearer ${TOKEN}"
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
    "participant": {
      "id": "gov",
      "identities": [
        {
          "fingerprint": "54:F9:85:11:91:8F:81:F8:54:DB:25:CE:E6:0D:2C:8C:BB:7B:AD:7F",
          "status": true
        }
      ],
      "msp": "org1MSP",
      "name": "Big Government",
      "type": "io.worldsibu.examples.participant"
    }
  },
  ...
```

### POST:/api/person

```shell
# /api/person
$ PAYLOAD="{ \"id\": \"koakh\", \"firstname\": \"Mario\", \"lastname\": \"Monteiro\", \"username\": \"koakh\", \"password\": \"12345678\", \"email\": \"mail@koakh.com\" }"
$ curl -k -s -X POST "${URI}/api/person" -H "accept: application/json" -H "Authorization: Bearer ${TOKEN}" -H "Content-Type: application/json" -d "${PAYLOAD}"
```

```json
{"type":"Buffer","data":[]}
```

### GET:/api/person/{id}

```shell
# /api/participant
$ ID=koakh
$ curl -k -s -X GET "${URI}/api/person/${ID}" -H "accept: application/json" -H "Authorization: Bearer ${TOKEN}" | jq
```

```json
{
  "id": "koakh",
  "type": "io.worldsibu.examples.person",
  "firstname": "Mario",
  "lastname": "Monteiro",
  "username": "koakh",
  "password": "$2b$10$.1unf8AGahW3ss.6NkFJsu1lIOUwg6oNGrgm4vGzSk3ztVaXlsn/i",
  "email": "mail@koakh.com",
  "roles": [
    "USER"
  ],
  "participant": {
    "id": "gov",
    "identities": [
      {
        "fingerprint": "54:F9:85:11:91:8F:81:F8:54:DB:25:CE:E6:0D:2C:8C:BB:7B:AD:7F",
        "status": true
      }
    ],
    "msp": "org1MSP",
    "name": "Big Government",
    "type": "io.worldsibu.examples.participant"
  }
}
```

### POST:/api/person/{id}/add-attribute

```shell
# /api/person
$ ID=koakh
$ PAYLOAD='{ "attributeId":"birth-year", "content": "1971" }'
$ curl -k -s -X POST "${URI}/api/person/${ID}/add-attribute" -H "accept: application/json" -H "Authorization: Bearer ${TOKEN}" -H "Content-Type: application/json" -d "${PAYLOAD}" | jq
```

```json
{
  "id": "koakh",
  "type": "io.worldsibu.examples.person",
  "firstname": "Mario",
  "lastname": "Monteiro",
  "username": "koakh",
  "password": "$2b$10$.1unf8AGahW3ss.6NkFJsu1lIOUwg6oNGrgm4vGzSk3ztVaXlsn/i",
  "email": "mail@koakh.com",
  "attributes": [
    {
      "certifierID": "gov",
      "content": "1971",
      "id": "birth-year",
      "issuedDate": 1577318087448,
      "type": "io.worldsibu.examples.attribute"
    }
  ],
  "roles": [
    "USER"
  ],
...  
```


npx hurl invoke person person_addAttribute 1-100-100 '{"id": "birth-year", "certifierID": "gov", "content": "1993", "issuedDate": 1554239270 }' -u admin
npx hurl invoke person person_getByAttribute birth-year 1993


TOKEN=$(curl -k -s -X POST https://localhost:3443/api/login -d '{ "username": "johndoe", "password": "12345678"}' -H 'Content-Type: application/json' | jq -r ".accessToken"
)
curl -k -X POST \
  https://localhost:3443/api/person/1-100-101/add-attribute \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${TOKEN}" \
  -d '{
    "attributeId":"birth-year",
    "content": "1971"
  }' | jq


npx hurl invoke person person_addAttribute 1-100-100 '{"id": "born-year", "certifierID": "gov", "content": "1971", "issuedDate": 1554239270 }' -u admin
npx hurl invoke person person_addAttribute 1-100-100 '{"id": "born-year", "content": "1971" }' -u admin