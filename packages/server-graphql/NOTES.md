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

to use `any` in grapl we must implement a custom scalar type or use the [graphql-type-json](https://github.com/taion/graphql-type-json) package

- [Dynamic (Unique) Objects in GraphQl](https://stackoverflow.com/questions/33819658/dynamic-unique-objects-in-graphql)

```typescript
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class Attribute {
  @Field(type => GraphQLJSONObject)
  public content: any;
```

"message": "JSONObject cannot represent non-object value: 1993"

$ npx hurl invoke person participant_changeIdentity great newIdentity -u admin
{ Error: transaction returned with failure: {"name":"Error","status":500,"message":"Unauthorized. Requester identity is not an admin"}

## Todo

Add Yup Validations