# NOTES

## Start

DONt forget to build common package, if change something

```shell
# build
$ npx lerna run build --scope @convector-sample/common --stream
```

```shell
# start dev|debug
$ npx lerna run start:dev --scope @convector-sample/server-graphql --stream
$ npx lerna run start:debug --scope @convector-sample/server-graphql --stream
```

<http://localhost:3000/graphql>

```shell
# add dependencies
$ npx lerna add participant-cc --scope @convector-sample/server-graphql
$ npx lerna add person-cc --scope @convector-sample/server-graphql
$ npx lerna add common --scope @convector-sample/server-graphql
```

## TypeGraphQL Notes

all input types required to have names @Args('getByAttributeInput') argument, else it crash with strange errors
@Args('getByAttributeInput') getByAttributeInput: GetByAttributeInput

## JSON Scalar Type

- [Custom scalars and enums - Apollo Docs](https://www.apollographql.com/docs/graphql-tools/scalars/)

```shell
# install graphql-type-json
$ npx lerna add graphql-type-json --scope @convector-sample/server-graphql
```

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

here we must convert "1993" into object ex `{ data: '1993' }` check function `convertAttributes`

after, test with more than on attribute with

```shell
# add some attributes
$ npx hurl invoke person person_addAttribute 1-100-101 '{"id": "graduated-year", "certifierID": "gov", "content": "1999", "issuedDate": 1554239270 }' -u admin
$ npx hurl invoke person person_addAttribute 1-100-101 '{"id": "marriage-year", "certifierID": "gov", "content": "2012", "issuedDate": 1554239270 }' -u admin
```

## Add all Other Query/Mutations

## 

unhandledPromiseRejectionWarning: Error: Cannot determine GraphQL input type for attribute

https://github.com/MichalLytek/type-graphql/blob/master/docs/resolvers.md#input-types

https://stackblitz.com/edit/convector
