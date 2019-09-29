# NOTES

## Links

- [@apollo/react-hooks: API reference](https://www.apollographql.com/docs/react/api/react-hooks/)
- [Apollo: Authentication](https://www.apollographql.com/docs/react/networking/authentication/)
- [Apollo client query error: “Network error: Failed to fetch” How to troubleshoot?](https://stackoverflow.com/questions/49394718/apollo-client-query-error-network-error-failed-to-fetch-how-to-troubleshoot)
- [Apollo Client, now with React Hooks](https://blog.apollographql.com/apollo-client-now-with-react-hooks-676d116eeae2)

- [@graphql-codegen](https://www.npmjs.com/package/@graphql-codegen/cli)
- [graphql-code-generator.com](https://graphql-code-generator.com/)

- [Visual Studio Code Settings Sync Gist](https://gist.github.com/benawad/1e9dd01994f78489306fbfd6f7b01cd3#file-snippets-typescriptreact-json)

## commands

```shell
# run server and app
$ npx lerna run start:debug --scope @convector-sample/server-graphql
$ npx lerna run start --scope @convector-sample/frontend-react --stream
# gen graphql
$ npx lerna run gen:graphql --scope @convector-sample/frontend-react
```

## 

1:25

```shell
# create  react app
$ cd packages
$ npx create-react-app frontend-react --typescript
# test it

```

```shell
# change package.json
$ code packages/frontend-react/package.json
```

change `"name": "frontend-react"` to `"name": "@convector-sample/frontend-react"`
and `"private": true` to `"private": false`, or remove it from `package.json` else it won't appear in `npx lerna list`, and we must use `npx lerna list -a`

- [@lerna/import](https://github.com/lerna/lerna/tree/master/commands/import)

```shell
# not clean and hosting all project dependencies
$ npx lerna clean -y && npx lerna bootstrap --hoist
# fix build cc and start server (Property 'get' does not exist on type....)
$ npx lerna run build --scope @convector-sample/participant-cc --stream
# test react app
$ npx lerna run start --scope @convector-sample/frontend-react --stream
```

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
$ npx lerna run start --scope @convector-sample/frontend-react --stream
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
$ npx lerna add apollo-boost --scope @convector-sample/frontend-react --no-bootstrap
$ npx lerna add @apollo/react-hooks --scope @convector-sample/frontend-react --no-bootstrap
$ npx lerna add graphql --scope @convector-sample/frontend-react --no-bootstrap
$ npx lerna add graphql --scope @convector-sample/frontend-react --no-bootstrap
# extra: required for Authorization: Bearer   
$ npx lerna add apollo-link-context --scope @convector-sample/frontend-react --no-bootstrap
$ npx lerna add @types/graphql --scope @convector-sample/frontend-react --no-bootstrap --dev
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

add  cors to nest.js server

bundle.esm.js:101 OPTIONS https://localhost:3443/graphql net::ERR_CERT_AUTHORITY_INVALID

npx lerna run start --scope @convector-sample/frontend-react --stream


Fix apollo react ERR_CERT_AUTHORITY_INVALID
https://github.com/apollographql/apollo-link/issues/229

it seems that won't work in chrom debugger
the trick is open <http://localhost:3000/> and accept certificate like we do to advance in invalid certificates, and it start to work in chrome debug mode

working version with a fresh login token

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

## Install GraphQL CodeGen

```shell
# install deps
$ npx lerna add @graphql-codegen/cli --scope @convector-sample/frontend-react --no-bootstrap --dev
$ npx lerna bootstrap
# help
$ npx graphql-codegen --help
```

### init project

create `src/graphql` folder

```shell
# enter frontend-react else it creates .yml and add script to main lerna package.json and not to frontend-react/package.json
$ cd packages/frontend-react/
# init
$ npx graphql-codegen init
# config
? What type of application are you building? Application built with React
? Where is your schema?: (path or url) https://localhost:3443/graphql
? Where are your operations and fragments?: src/graphql/*.graphql
# plugins
? Pick plugins: TypeScript (required by other typescript plugins), TypeScr
ipt Operations (operations and fragments), TypeScript React Apollo (typed 
components and HOCs)
# config
? Where to write the output: src/generated/graphql.ts
? Do you want to generate an introspection file? Yes
? How to name the config file? codegen.yml
# script
? What script in package.json should run the codegen? gen:graphql

config file generated at codegen.yml

$ npm install
To install the plugins.

$ npm run gen:graphql
To run GraphQL Code Generator.
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

https://graphql-code-generator.com/docs/getting-started/codegen-config

Debug Mode
You can set the DEBUG environment to 1 in order to tell the Codegen to print debug information.

You can set the VERBOSE environment to 1 in order to tell the codegen to print more information regarding the CLI output (listr).

$ DEBUG=1
$ cd packages/frontend-react
$ npm run gen:graphql

  ✖ ./graphql.schema.json
    Failed to load schema from https://localhost:3443/graphql:

        request to https://localhost:3443/graphql failed, reason: self signed certificate


add to script

"gen:graphql": "NODE_TLS_REJECT_UNAUTHORIZED=0 graphql-codegen --config codegen.yml"

 Found 1 error
  ✖ src/generated/graphql.ts
    Plugin "react-apollo" requires extension to be ".tsx"!

now change `packages/frontend-react/codegen.yml`
src/generated/graphql.ts:
to
src/generated/graphql.tsx:

  ✔ Parse configuration
  ✔ Generate outputs

npm run gen:graphql

now test with lerna script

$ npx lerna run gen:graphql --scope @convector-sample/frontend-react

it works move on

## Working with GraphQL-CodeGen

name queries from `query ($id: String!)` to `query participantById($id: String!)` this way we prevent 

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

### Configure hooke plugins

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

## Configure react Router

```shell
# add apollo
$ npx lerna add react-router-dom --scope @convector-sample/frontend-react --no-bootstrap
$ npx lerna add @types/react-router-dom --scope @convector-sample/frontend-react --no-bootstrap
$ npx lerna bootstrap
```

