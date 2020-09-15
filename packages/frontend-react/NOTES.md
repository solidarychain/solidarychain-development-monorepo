# NOTES : Warning : Internal notes, subject to errors and typos

- [NOTES : Warning : Internal notes, subject to errors and typos](#notes--warning--internal-notes-subject-to-errors-and-typos)
  - [TLDR](#tldr)
  - [Commit Ids](#commit-ids)
    - [4c427d4: Last commit before Chakra UI layer on React Frontend](#4c427d4-last-commit-before-chakra-ui-layer-on-react-frontend)
  - [Links](#links)
    - [React Apollo](#react-apollo)
    - [React Apollo / Migration Project](#react-apollo--migration-project)
    - [Fix1: Type 'ApolloLink' is not assignable to type 'ApolloLink | RequestHandler'. Type 'ApolloLink' is missing the following properties from type 'ApolloLink': onError, setOnError](#fix1-type-apollolink-is-not-assignable-to-type-apollolink--requesthandler-type-apollolink-is-missing-the-following-properties-from-type-apollolink-onerror-setonerror)
    - [GraphQL CodeGen](#graphql-codegen)
    - [Ben Awad](#ben-awad)
  - [Quick Commands](#quick-commands)
  - [Bootstrap App](#bootstrap-app)
  - [Fix Jest 24.9.0](#fix-jest-2490)
  - [Setup VSCode Debug](#setup-vscode-debug)
  - [Clean up and start working on App](#clean-up-and-start-working-on-app)
  - [Add Apollo](#add-apollo)
    - [Fix apollo react ERR_CERT_AUTHORITY_INVALID](#fix-apollo-react-err_cert_authority_invalid)
    - [Fix Received status code 400 on Login](#fix-received-status-code-400-on-login)
    - [Add Cors Origin to express and apollo server](#add-cors-origin-to-express-and-apollo-server)
  - [Install GraphQL CodeGen](#install-graphql-codegen)
    - [init project](#init-project)
    - [Debug Mode](#debug-mode)
  - [Working with GraphQL-CodeGen](#working-with-graphql-codegen)
    - [Configure hooks plugins](#configure-hooks-plugins)
  - [Problems and Solutions with graphql-codegen](#problems-and-solutions-with-graphql-codegen)
    - [Error #1](#error-1)
    - [Error #2](#error-2)
  - [Configure react Router](#configure-react-router)
  - [Apollo resetStore /Cache](#apollo-resetstore-cache)
  - [Use JS-Cookie](#use-js-cookie)
  - [When we change cc models like adding new props to model...missing the following properties from type  'Person': identities, createdDate](#when-we-change-cc-models-like-adding-new-props-to-modelmissing-the-following-properties-from-type-person-identities-createddate)
  - [Error: GraphQL error: [object Object]](#error-graphql-error-object-object)
  - [React router Property 'message' does not exist on type '{}'.  TS2339](#react-router-property-message-does-not-exist-on-type--ts2339)
  - [WebSocketLink authToken Subscriptions](#websocketlink-authtoken-subscriptions)
  - [Add Material-UI and React Router](#add-material-ui-and-react-router)

## TLDR

> Notes: use node 12.8.1 or 8.16.0 to

1. check server `CORS_ORIGIN_REACT_FRONTEND`, if `CORS_ORIGIN_REACT_FRONTEND=https://app.solidarychain.com:3000` use same uri in browser, else we have CORS problems
2. run frontend with `npm run pkg:react:start`
3. launch debug with F5 (https://app.solidarychain.com:3000)
4. test login/logout and refresh-token
5. test subscriptions

## Commit Ids

### 4c427d4: Last commit before Chakra UI layer on React Frontend

- [4c427d4](https://github.com/solidarychain/solidarychain-development-monorepo/commit/4c427d4dc007edc81d315e634fcc2b9667e5ac60)
- [4c427d4dc007edc81d315e634fcc2b9667e5ac60](https://github.com/solidarychain/solidarychain-development-monorepo/tree/4c427d4dc007edc81d315e634fcc2b9667e5ac60)

> checkout to get old non chakra ui version, with all 100% inclusive subscriptions

## Links

### React Apollo

- [React Apollo API reference](https://www.apollographql.com/docs/react/api/react-apollo/)
- [@apollo/react-hooks: API reference](https://www.apollographql.com/docs/react/api/react-hooks/)
- [Apollo: Authentication](https://www.apollographql.com/docs/react/networking/authentication/)
- [Apollo client query error: “Network error: Failed to fetch” How to troubleshoot?](https://stackoverflow.com/questions/49394718/apollo-client-query-error-network-error-failed-to-fetch-how-to-troubleshoot)
- [Apollo Client, now with React Hooks](https://blog.apollographql.com/apollo-client-now-with-react-hooks-676d116eeae2)

### React Apollo / Migration Project

- [Migrating to Apollo Client 3.0](https://www.apollographql.com/docs/react/migrating/apollo-client-3-migration/)

### Fix1: Type 'ApolloLink' is not assignable to type 'ApolloLink | RequestHandler'. Type 'ApolloLink' is missing the following properties from type 'ApolloLink': onError, setOnError

- [Type 'ApolloLink' is not assignable to type 'ApolloLink'](https://github.com/apollographql/apollo-client/issues/6011)

> The solution for me was to use the links included in @apollo/client instead of the @apollo/link-* packages. See the part about links in the migration docs for more [information](https://www.apollographql.com/docs/react/migrating/apollo-client-3-migration/#apollo-link-)

```typescript
// import { onError } from 'apollo-link-error';
import { onError } from '@apollo/link-error';
```

### GraphQL CodeGen

- [@graphql-codegen](https://www.npmjs.com/package/@graphql-codegen/cli)
- [graphql-code-generator.com](https://graphql-code-generator.com/)

### Ben Awad

- [JWT Authentication Node.js Tutorial with GraphQL and React](https://www.youtube.com/watch?v=25GS0MLT8JU&t=368s)
- [benawad/jwt-auth-example](https://github.com/benawad/jwt-auth-example)
- [Visual Studio Code Settings Sync Gist](https://gist.github.com/benawad/1e9dd01994f78489306fbfd6f7b01cd3#file-snippets-typescriptreact-json)

> another great video from this wise "kid" [Ben Awad](https://www.youtube.com/channel/UC-8QAzbLcRglXeN_MY9blyw), thanks man your are great

## Quick Commands

```shell
# run server
$ npx lerna run start:debug --scope @solidary-chain/server-graphql --stream
# run frontend
$ npx lerna run start --scope @solidary-chain/frontend-react --stream
# gen graphql, require graphql server running, and graphql-codegen/cli installed, config in codegen.yml
$ npx lerna run gen:graphql --scope @solidary-chain/frontend-react --stream
```

## Bootstrap App

```shell
# create  react app
$ cd packages
$ npx create-react-app frontend-react --typescript
```

```shell
# change package.json
$ code packages/frontend-react/package.json
```

change `"name": "frontend-react"` to `"name": "@solidary-chain/frontend-react"`
and `"private": true` to `"private": false`, or remove it from `package.json` else it won't appear in `npx lerna list`, and we must use `npx lerna list -a`

- [@lerna/import](https://github.com/lerna/lerna/tree/master/commands/import)

```shell
# not clean and hosting all project dependencies
$ npx lerna clean -y && npx lerna bootstrap --hoist
# fix build cc and start server (Property 'get' does not exist on type....). require to rebuild -cc packages
$ npx lerna run build --scope @solidary-chain/participant-cc --stream
# test react app
$ npx lerna run start --scope @solidary-chain/frontend-react --stream
```

## Fix Jest 24.9.0

- [Support Jest 24.9.0](https://github.com/facebook/create-react-app/issues/7580)

```shell
# errors  
The react-scripts package provided by Create React App requires a dependency "jest": "24.9.0"
# the problem is using yarn and npm, remove lock files
$ rm packages/frontend-react/yarn.json
$ rm packages/frontend-react/package-lock.json
$ rm packages/frontend-react/node_modules/ -r
# fix it with SKIP_PREFLIGHT_CHECK else it won't work
$ nano packages/frontend-react/.env
# add
SKIP_PREFLIGHT_CHECK=true
# now bootstrap
$ npx lerna bootstrap
```

done

## Setup VSCode Debug

- [React Starter](:note:ef02870a-e3e8-4586-9baa-e752f1b9086e)

add `.vscode/launch.json` and `packages/frontend-react/.vscode/launch.json` this way work if we are in root folder and project folder as vscode open folder

add 3 configs, one for chrome and 2 for `browser-preview` extension

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceRoot}/src",
      "userDataDir": "${workspaceRoot}/.vscode/chrome",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    },
    {
      "type": "browser-preview",
      "request": "attach",
      "name": "Browser Preview: Attach"
    },
    {
      "type": "browser-preview",
      "request": "launch",
      "name": "Browser Preview: Launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

```shell
# boot app with a breakpoint and press F5 and done
$ npx lerna run start --scope @solidary-chain/frontend-react --stream
```

now add `.vscode/chrome` to `.gitignore` to ignore chrome local cache

finish adding project to repo with

```shell
# add and push
$ git add .
$ git commit -am "add frontend-react to mono repo project"
```

add to workspace settings `"browser-preview.startUrl": "http://localhost:3000"`

## Clean up and start working on App

```shell
# clean up
$ rm packages/frontend-react/README.md
$ rm packages/frontend-react/src/App.css
$ rm packages/frontend-react/src/App.test.tsx
$ rm packages/frontend-react/src/index.css
$ rm packages/frontend-react/src/serviceWorker.ts
$ rm packages/frontend-react/src/logo.svg
```

`packages/frontend-react/src/index.tsx`

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

`packages/frontend-react/src/App.tsx`

```shell
import React from 'react';

const App: React.FC = () => {
  return (
    <div>Hello</div>
  );
}

export default App;
```

## Add Apollo

```shell
# add apollo
$ npx lerna add apollo-boost --scope @solidary-chain/frontend-react --no-bootstrap
$ npx lerna add @apollo/react-hooks --scope @solidary-chain/frontend-react --no-bootstrap
$ npx lerna add graphql --scope @solidary-chain/frontend-react --no-bootstrap
$ npx lerna add graphql --scope @solidary-chain/frontend-react --no-bootstrap
# extra: required for Authorization: Bearer   
$ npx lerna add apollo-link-context --scope @solidary-chain/frontend-react --no-bootstrap
$ npx lerna add @types/graphql --scope @solidary-chain/frontend-react --no-bootstrap --dev
$ npx lerna bootstrap
```

add apollo client and wrap app, and add authorization and self signed certificate stuff

> don't forget to add CORS to `server-grapqhl`

`packages/server-graphql/src/main.ts`

```typescript
app.useGlobalPipes(new ValidationPipe());
app.enableCors({
  origin: 'http://localhost:3000',
  credentials: true,
});
```

### Fix apollo react ERR_CERT_AUTHORITY_INVALID

- [How to avoid "self signed certificate" error?](https://github.com/apollographql/apollo-link/issues/229)

![ERR_CERT_AUTHORITY_INVALID](assets/images/020.png)

the trick is open nestjs graphql playground (https) on chrome or chrome debugger at <https://localhost:3443/graphql> or <https://192.168.1.133:3443/graphql>, and **accept certificate** , and it start to work react app, in chrome debug mode, and in non chrome debugger.

![ERR_CERT_AUTHORITY_INVALID](assets/images/030.png)

### Fix Received status code 400 on Login

login failed please try again...

inspect with devtools

![Received status code 400](assets/images/032.png)

it seems a change in models, we remove `identities`

```json
{message: "Cannot query field "identities" on type "Participant".", locations: [{line: 22, column: 9}]}
```

fix : remove identities from `personLogin.graphql` and generate graphql schema with `pkg:react:gen-graphql:watch`, and in all other queries, mutations and subscriptions to

```graphql
participant {
  id
  name
  msp
  identities {
    id
    status
    fingerprint
  }
}

```### Add/Configure CORS

add cors to nest.js server

`packages/frontend-react/src/index.tsx`

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from '@apollo/react-hooks'
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import https from 'https';

// minimal version without
// const client = new ApolloClient({
//   uri: 'https://localhost:3443/graphql'
// });

const headers:any = [];
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

const httpLink = createHttpLink({
  uri: 'https://localhost:3443/graphql',

  fetchOptions: {
    agent: new https.Agent({ rejectUnauthorized: false }),
  },  
});

const authLink = setContext((_: any, { headers }: any) => {
  // get the authentication token from local storage if it exists
  let token = localStorage.getItem('token');
  if (!token) {
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphbmVkb2UiLCJpYXQiOjE1Njk1MzY4MzMsImV4cCI6MTU2OTUzNzczM30.WzkWl0tn4xo9si4SMJdR6LIYcWvKMHSu4JaMtpOzQAE';
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('root')
);
```

`packages/frontend-react/src/App.tsx`

```typescript
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const App: React.FC = () => {
  const { data, loading, error } = useQuery(gql`
    query ($id: String!){
      participantById(id:$id)
      {
        id
        name
        msp,
        identities{
          id
          status
          fingerprint
        }
      }
    }
  `, {
    variables: {
      'id': 'gov'
    },
  })

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <pre>{JSON.stringify(error, undefined, 2)}</pre>
  }

  return (
    <div>{JSON.stringify(data, undefined, 2)}</div>
  );
}

export default App;
```

### Add Cors Origin to express and apollo server

- [CORS in Apollo Client & Apollo Server](https://dev.to/doylecodes/cors-in-apollo-client-apollo-server-3cbj)

> UPDATE: when working with vm in origin <https://192.168.1.133:3000> we have the traditional cors origin problem, to fix we must configure both express and and apollo server to work with frontend origin, currently only work with default <http://localhost:3000>, we need to use a env variable to use custom origins, in this case we use `CORS_ORIGIN_REACT_FRONTEND=https://192.168.1.133:3000`

add to `packages/server-graphql/.env`

```conf
# required to define when we don't use default origin http://localhost:3000
# CORS_ORIGIN_REACT_FRONTEND=https://app.solidarychain.com:3000
```

add `corsOriginReactFrontend`  to `packages/server-graphql/src/env.ts`

```typescript
export const envVariables: any = {
  ...
  // cors origin react frontend
  corsOriginReactFrontend: process.env.CORS_ORIGIN_REACT_FRONTEND || 'http://localhost:3000',
};
```

now use `e.corsOriginReactFrontend` in both express and apollo config

`packages/server-graphql/src/app.module.ts`

```typescript
// ApolloServer config
GraphQLModule.forRoot({
  ...
  // configure graphql cors here
  cors: {
    origin: e.corsOriginReactFrontend,
    credentials: true,
  },
}),
```

`packages/server-graphql/src/main.ts`

```typescript
async function bootstrap() {
  ...
  // rest server cors, before any middleware,
  // warn cors for graphql is configured in ApplicationModule
  app.enableCors({
    origin: e.corsOriginReactFrontend,
    credentials: true,
  });
  ...
}
```

restart `server-graphql` and test from `frontend-react` uri <https://192.168.1.133:3000>

now it work without issues

## Install GraphQL CodeGen

```shell
# add graphql-codegen dependency to lerna mono repo
$ npx lerna add @graphql-codegen/cli --scope @solidary-chain/frontend-react --no-bootstrap --dev
# help
$ npx graphql-codegen --help
# install deps
$ npx lerna bootstrap
```

### init project

create `src/graphql` folder

```shell
# enter frontend-react else it creates .yml and add script to main lerna package.json and not to frontend-react/package.json
$ cd packages/frontend-react
# init
$ npx graphql-codegen init
# config
? What type of application are you building? Application built with React
? Where is your schema?: (path or url) https://localhost:3443/graphql
? Where are your operations and fragments?: src/graphql/*.graphql
# plugins
? Pick plugins: TypeScript (required by other typescript plugins), TypeScr
ipt Operations (operations and fragments), TypeScript React Apollo (typed 
components and HOC\'s)
# config
? Where to write the output: src/generated/graphql.ts
? Do you want to generate an introspection file? Yes
? How to name the config file? codegen.yml
# script
? What script in package.json should run the codegen? gen:graphql

# config file generated at `codegen.yml`

# to install the plugins.
$ npm install

# to run GraphQL Code Generator.
$ npm run gen:graphql
```

new file `packages/frontend-react/codegen.yml`
script added `"gen:graphql": "graphql-codegen --config codegen.yml"`

```shell
# add dep added by codegen
$ npx lerna bootstrap
```

```json
"devDependencies": {
  "@graphql-codegen/cli": "^1.7.0",
  "@types/graphql": "^14.5.0",
  "@graphql-codegen/typescript": "1.7.0",
  "@graphql-codegen/typescript-operations": "1.7.0",
  "@graphql-codegen/typescript-react-apollo": "1.7.0",
  "@graphql-codegen/introspection": "1.7.0"
}
```

- [Codegen Options Config](https://graphql-code-generator.com/docs/getting-started/codegen-config)

### Debug Mode

- You can set the `DEBUG` environment to 1 in order to tell the Codegen to print debug information.
- You can set the `VERBOSE` environment to 1 in order to tell the codegen to print more information regarding the CLI output (listr).

```shell
$ DEBUG=1
$ cd packages/frontend-react
$ npm run gen:graphql

  ✖ ./graphql.schema.json
    Failed to load schema from https://localhost:3443/graphql:
        request to https://localhost:3443/graphql failed, reason: self signed certificate
```

fix add to script `"gen:graphql": "NODE_TLS_REJECT_UNAUTHORIZED=0 graphql-codegen --config codegen.yml"`

```
 Found 1 error
  ✖ src/generated/graphql.ts
    Plugin "react-apollo" requires extension to be ".tsx"!
```

now change `packages/frontend-react/codegen.yml` 

`src/generated/graphql.ts:` to `src/generated/graphql.tsx:`

now it works

```shell
$ npm run gen:graphql
✔ Parse configuration
✔ Generate outputs
```

now test with lerna script

```shell
$ npx lerna run gen:graphql --scope @solidary-chain/frontend-react
```

it works move on

## Working with GraphQL-CodeGen

name queries from `query ($id: String!)` to `query participantById($id: String!)` this way we prevent above unnamed names

```typescript
export type Unnamed_1_QueryVariables = {
..
export type Unnamed_1_Query = (
..
```

now will be generated like

```typescript
export type ParticipantByIdQueryVariables = {
...

export type ParticipantByIdQuery = (
...
```

### Configure hooks plugins

change `packages/frontend-react/codegen.yml` to use only hooks

```yml
generates:
  src/generated/graphql.tsx:
    plugins:
    ...
    config:
      withHOC: false
      withComponent: false
      withHooks: true
```

now we some good stuff hooks use functions like `useParticipantByIdQuery` and `useParticipantByIdLazyQuery`

## Problems and Solutions with graphql-codegen

### Error #1

> UPDATED: 2020-01-14 20:12:59, after sometime without using codegen, now it gives below error

```shell
$ npx lerna run gen:graphql --scope @solidary-chain/frontend-react --stream
Invalid regular expression: /\$\{(?<name>[A-Z0-9_]+)(\:((?<value>[^\:]+)|(\"(?<customValue>[^\"]+)\")))?\}/: Invalid group
```

after a some debug found that is the parameter `--config codegen.yml` that is causing the problem, pure luck, removed `--config codegen.yml` and it from `package.json` start working again

```json
// KO
"gen:graphql:watch": "NODE_TLS_REJECT_UNAUTHORIZED=0 graphql-codegen --config codegen.yml",
// OK
"gen:graphql:watch": "NODE_TLS_REJECT_UNAUTHORIZED=0 graphql-codegen",
```

```shell
$ npx lerna run gen:graphql --scope @solidary-chain/frontend-react --stream
@solidary-chain/frontend-react: > @solidary-chain/frontend-react@0.1.0 gen:graphql /media/mario/Storage/Development/@SolidaryChain/network/packages/frontend-react
@solidary-chain/frontend-react: > NODE_TLS_REJECT_UNAUTHORIZED=0 graphql-codegen
@solidary-chain/frontend-react: [20:10:05] Parse configuration [started]
@solidary-chain/frontend-react: [20:10:05] Parse configuration [completed]
@solidary-chain/frontend-react: [20:10:05] Generate outputs [started]
@solidary-chain/frontend-react: [20:10:05] Generate src/generated/graphql.tsx [started]
@solidary-chain/frontend-react: [20:10:05] Generate ./graphql.schema.json [started]
@solidary-chain/frontend-react: [20:10:05] Load GraphQL schemas [started]
@solidary-chain/frontend-react: [20:10:05] Load GraphQL schemas [started]
@solidary-chain/frontend-react: [20:10:05] Load GraphQL schemas [completed]
@solidary-chain/frontend-react: [20:10:05] Load GraphQL documents [started]
@solidary-chain/frontend-react: [20:10:05] Load GraphQL schemas [completed]
@solidary-chain/frontend-react: [20:10:05] Load GraphQL documents [started]
@solidary-chain/frontend-react: [20:10:05] Load GraphQL documents [completed]
@solidary-chain/frontend-react: [20:10:05] Generate [started]
@solidary-chain/frontend-react: [20:10:05] Generate [completed]
@solidary-chain/frontend-react: [20:10:05] Generate src/generated/graphql.tsx [completed]
@solidary-chain/frontend-react: [20:10:05] Load GraphQL documents [completed]
@solidary-chain/frontend-react: [20:10:05] Generate [started]
@solidary-chain/frontend-react: [20:10:05] Generate [completed]
@solidary-chain/frontend-react: [20:10:05] Generate ./graphql.schema.json [completed]
@solidary-chain/frontend-react: [20:10:05] Generate outputs [completed
```

### Error #2

UPDATE: requires node v10.12.0 to prevent bellow error

```shell
$ pkg:react:gen-graphql:watch
@solidary-chain/frontend-react: > @solidary-chain/frontend-react@0.1.0 gen:graphql:watch /media/mario/Storage/Documents/Development/@SolidaryChain/solidarychain-development-monorepo/packages/frontend-react
@solidary-chain/frontend-react: > NODE_TLS_REJECT_UNAUTHORIZED=0 graphql-codegen --watch
@solidary-chain/frontend-react: /media/mario/Storage/Documents/Development/@SolidaryChain/solidarychain-development-monorepo/node_modules/@graphql-toolkit/core/index.cjs.js:74
```

## Configure react Router

```shell
# add apollo
$ npx lerna add react-router-dom --scope @solidary-chain/frontend-react --no-bootstrap
$ npx lerna add @types/react-router-dom --scope @solidary-chain/frontend-react --no-bootstrap --dev
$ npx lerna bootstrap
```

## Apollo resetStore /Cache

- [Reset store on logout](https://www.apollographql.com/docs/react/networking/authentication/#reset-store-on-logout)

```
bundle.esm.js:76 Uncaught (in promise) Error: Network error: Store reset while query was in flight (not completed in link chain)
```

on try to `await client!.resetStore();`

## Use JS-Cookie

- [js-cookie](https://github.com/js-cookie/js-cookie)

```shell
# add js-cookie
$ npx lerna add js-cookie --scope @solidary-chain/frontend-react --no-bootstrap
$ npx lerna add @types/js-cookie --scope @solidary-chain/frontend-react --no-bootstrap --dev
$ npx lerna bootstrap
```

## When we change cc models like adding new props to model...missing the following properties from type  'Person': identities, createdDate

![fix missing property](assets/images/060.png)

![fix missing property](assets/images/050.png)

![fix missing property](assets/images/040.png)

```shell
solidary-chain/frontend-react:   Types of parameters 'e' and 'value' are incompatible.
@solidary-chain/frontend-react:     Type '{ __typename?: "Person"; } & Pick<Person, "id" | "username" | "email" | "roles" | "mobilePhone" | "postal" | "city" | "region" | "geoLocation" | "timezone" | "personalInfo" | ... 26 more ... | "registrationDate"> & { ...; }' is missing the following properties from type 'Person': identities, createdDate  TS2345
```

...fuck after an hour struggling, it seems that it's because fields are required in offended querie `PersonsQuery` in `packages/frontend-react/src/graphql/query/persons.graphql`, even after I add it, and generate with `npm run pkg:graphql:debug`, this is because it gives the next error for participant and seems the same error, but is not, is other

we can check generated model

```typescript
export type PersonsQuery = (
  { __typename?: 'Query' }
  & { persons: Array<(
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'username' | 'email' | 'roles' | 'mobilePhone' | 'postal' | 'city' | 'region' | 'geoLocation' | 'timezone' | 'personalInfo' | 'profile' | 'firstname' | 'lastname' | 'gender' | 'height' | 'fatherFirstname' | 'fatherLastname' | 'motherFirstname' | 'motherLastname' | 'birthDate' | 'nationality' | 'country' | 'documentNumber' | 'documentType' | 'cardVersion' | 'emissionDate' | 'expirationDate' | 'emittingEntity' | 'identityNumber' | 'fiscalNumber' | 'socialSecurityNumber' | 'beneficiaryNumber' | 'pan' | 'requestLocation' | 'otherInformation' | 'registrationDate'>
```

this fix is tricky after adding `identities` and `createdDate` to `graphql/query/persons.graphql` it gives other error related with participant, the problem is that we need to add the `identities` and `createdDate` to chiled field participant too :(

```graphql
query persons($skip: Int, $take: Int) {
  persons(skip: $skip, take: $take) {
    # non citizenCard data
    id
    username
    ....
    # ADDED new Properties
    participant {
      id
      name
      msp
      identities {
        id
        status
        fingerprint
      }
      identities {
        id
        status
        fingerprint
      }
      createdDate
    }
    ...
    otherInformation
    registrationDate
    # ADDED new Properties
    identities {
      id
      status
      fingerprint
    }
    createdDate
  }
}
```

## Error: GraphQL error: [object Object]

![GraphQL error](assets/images/070.png)

{ Error: transaction returned with failure: {"name":"Error","status":500,"message":"Maximum call stack size exceeded"}

```
info: [Chaincode] =========== Invoked Chaincode Chaincode ===========
info: [Chaincode] Transaction ID: bcdfeb3df925023ffe29fbe132b3a7fa86c72b975c4898b90084ae2dca452db6
info: [Chaincode] Args: participant_register,gov,Big Government
debug: [Chaincode] ============= START : participant_register ===========
error: [Chaincode]  
{ message: 'Maximum call stack size exceeded',
  stack: 'RangeError: Maximum call stack size exceeded\n
```

it seems that the problem stack is assign gov to participant in goc, maybe a cliclic reference or a sort of

## React router Property 'message' does not exist on type '{}'.  TS2339

changed `location.state.message` to `(location.state as any).message`

```typescript
{(location.state && (location.state as any).message) && <ShowMessage type={MessageType.SUCCESS} message={(location.state as any).message} />}
```

## WebSocketLink authToken Subscriptions

> the trick to get `getAccessToken()` in WebSocketLink options is using a annonimous function, like show bellow

- [apollo-link-ws: how to change connectionParams (and token) after initial setup?](https://github.com/apollographql/apollo-link/issues/197)

```typescript
const wsLink = new WebSocketLink({
  uri: e.graphqlServerWsUri,
  options: {
    reconnect: true,
    // here we can send arbitrary data to be passed to server
    // ex server catch with `const authToken: string = ('authorization' in connectionParamsLowerKeys)`
    connectionParams: () => ({
      authorization: `Bearer ${getAccessToken()}`,
    }),
  },
});
```

## Add Material-UI and React Router

- [commit id fbd4965](https://github.com/solidarychain/solidarychain-development-monorepo/commit/fbd49657b5638802c0f962f346b0729756a8cfa5)

```shell
# add package to package
$ TO_PACKAGE="@solidary-chain/frontend-react"
$ ADD_PACKAGE="@material-ui/core" && npx lerna add ${ADD_PACKAGE} --scope ${TO_PACKAGE}
$ ADD_PACKAGE="@material-ui/icons" && npx lerna add ${ADD_PACKAGE} --scope ${TO_PACKAGE}
$ ADD_PACKAGE="@material-ui/lab" && npx lerna add ${ADD_PACKAGE} --scope ${TO_PACKAGE}
$ ADD_PACKAGE="react-router-dom" && npx lerna add ${ADD_PACKAGE} --scope ${TO_PACKAGE}
$ ADD_PACKAGE="react-use-dimensions" && npx lerna add ${ADD_PACKAGE} --scope ${TO_PACKAGE}
# dev
$ ADD_PACKAGE="@types/react-router-dom" && npx lerna add -D ${ADD_PACKAGE} --scope ${TO_PACKAGE}
```
