# NOTES

## Start

DONt forget to build common package `@convector-sample/common`, if change something, but first restart server

```shell
# build
$ npx lerna run build --scope @convector-sample/common --stream
```

```shell
# start debug
$ npx lerna run start:debug --scope @convector-sample/server-rest --stream
$ npx lerna run start:debug --scope @convector-sample/server-graphql --stream
```

<http://localhost:3000/graphql>

```shell
# add dependencies
$ npx lerna add participant-cc --scope @convector-sample/server-graphql
$ npx lerna add person-cc --scope @convector-sample/server-graphql
$ npx lerna add common --scope @convector-sample/server-graphql
```

## GraphQL project use server-rest auth and users module

required to create symbolic links, else we have a lots of problems with dist and builds if we try to back dirs

```shell
# sym link auth and user modules
$ cd packages/server-graphql/src
$ ln -s ../../server-rest/src/auth/
$ ln -s ../../server-rest/src/users/
```

## Links

- [Convector Slackbiz](https://stackblitz.com/edit/convector)
- [Use ObjectType and InputType decorators together](https://github.com/MichalLytek/type-graphql/issues/62)

## TypeGraphQL Notes

all input types required to have names `@Args('getByAttributeInput') argument`, else it crash with strange errors ex

```typescript
@Args('getByAttributeInput') getByAttributeInput: GetByAttributeInput
```

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

`"message": "JSONObject cannot represent non-object value: 1993"`

here we must convert "1993" into object ex `{ data: '1993' }` check function `convertAttributes`

after, test with more than on attribute with

```shell
# add some attributes
$ npx hurl invoke person person_addAttribute 1-100-101 '{"id": "graduated-year", "certifierID": "gov", "content": "1999", "issuedDate": 1554239270 }' -u admin
$ npx hurl invoke person person_addAttribute 1-100-101 '{"id": "marriage-year", "certifierID": "gov", "content": "2012", "issuedDate": 1554239270 }' -u admin
```

## Add all Other Query/Mutations

## How to use content attribute

- [How to use Convector to querie CouchDB Rich Queries with JSON Objects?](https://stackoverflow.com/questions/57838092/how-to-use-convector-to-querie-couchdb-rich-queries-with-json-objects)

`packages/person-cc/src/person.model.ts`

```typescript
// Diego: I see, all properties need a @Validate() decorator else convector will ignore it
// Required to use nullable(), else content must be a `object` type, but the final value was: `null`
@Required()
@Validate(yup.object().nullable())
public content: any;
```

without `.nullable()` we get

```
500,"message":"Error for field 'attributes' with val '[{\"certifierID\":\"gov\",\"content\":\"1993\",\"id\":\"birth-year\",\"phase2\":\"2013\",\"phase3\":\"2013\"},\"id\":\"reborn5-year\",\"issuedDate\":1554239270,
\"type\":\"io.worldsibu.examples.attribute\"}]' [0].content must be a `object` type, but the final value was: `null` (cast from the value `\"1993\"`).\n If \"null\" is intended as an empty value be sure to mark the schema as `.nullable()`"}]. Sending ERROR message back to peer  
```

## Problem with RichQueries with Object

```typescript
return await Person.query(Person, {
  selector: {
    type: c.CONVECTOR_MODEL_PATH_PERSON,
    attributes: {
      $elemMatch: {
        id: id,
        content: value
      }
    }
  }
});
```

in docker logs we can view that value is content is sent has a string and not a object ex `"content":"{\"data\":\"1971\"}"`

```json
{"selector":{"type":"io.worldsibu.examples.person","attributes":{"$elemMatch":{"id":"born-year","content":"{\"data\":\"1971\"}"}}}}
```

> read the SO post, link on top of notes
