# NOTES

## Start

DONt forget to build common package

$ npx lerna run build --scope @convector-sample/common  --stream

npx lerna run start:dev --scope @convector-sample/server-graphql --stream
npx lerna run start:debug --scope @convector-sample/server-graphql --stream

<http://localhost:3000/graphql>

$ npx lerna add participant-cc --scope @convector-sample/server-graphql
$ npx lerna add person-cc --scope @convector-sample/server-graphql
$ npx lerna add common --scope @convector-sample/server-graphql

https://stackoverflow.com/questions/33819658/dynamic-unique-objects-in-graphql
https://www.apollographql.com/docs/graphql-tools/scalars/
$ npx lerna add graphql-type-json --scope @convector-sample/server-graphql

## JSON Scalar Type

```typescript
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class Attribute {
  @Field(type => GraphQLJSONObject)
  public content: any;
```

## Todo

Add Yup Validations

