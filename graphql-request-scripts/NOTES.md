# NOTES

## Init Porjct

```shell
$ npm init -y
$ npm i graphql-request graphql
```

## Problem of import

- [Node.js - SyntaxError: Unexpected token import](https://stackoverflow.com/questions/39436322/node-js-syntaxerror-unexpected-token-import)

fix with `esm`

> This small, but mighty package allows you to use either import or require.

```javascript
import { request, gql } from 'graphql-request'
       ^
SyntaxError: Unexpected token {
```

```shell
# install esm in your project
$ npm install --save esm

# update your Node Start Script to use esm
$ node -r esm app.js
```
