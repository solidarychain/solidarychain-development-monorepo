# NOTES : Warning : Internal notes, subject to errors and typos

- [NOTES : Warning : Internal notes, subject to errors and typos](#notes--warning--internal-notes-subject-to-errors-and-typos)
  - [Start](#start)
  - [GraphQL project use server-rest auth and users module](#graphql-project-use-server-rest-auth-and-users-module)
  - [Links](#links)
  - [TypeGraphQL Notes](#typegraphql-notes)
  - [JSON Scalar Type](#json-scalar-type)
  - [Date Scalars](#date-scalars)
  - [Add all Other Query/Mutations](#add-all-other-querymutations)
  - [How to use content attribute](#how-to-use-content-attribute)
  - [Problem with RichQueries with Object](#problem-with-richqueries-with-object)
  - [Authentication Notes](#authentication-notes)
  - [Problem: Nest can't resolve dependencies of the GqlLocalAuthGuard](#problem-nest-cant-resolve-dependencies-of-the-gqllocalauthguard)
  - [Awesome Link: Support AuthGuard](#awesome-link-support-authguard)
  - [Problem with return super.canActivate(new ExecutionContextHost([req]))](#problem-with-return-supercanactivatenew-executioncontexthostreq)
  - [@CurrentUser() decorator, to get @CurrentUser() in graphql endpoints like in personProfile](#currentuser-decorator-to-get-currentuser-in-graphql-endpoints-like-in-personprofile)
  - [Getting headers in graphql](#getting-headers-in-graphql)
  - [Cookie Parser](#cookie-parser)
  - [Apollo-Link-Token-Refresh and Migrate apollo-boost to apollo-client](#apollo-link-token-refresh-and-migrate-apollo-boost-to-apollo-client)

## Start

DONt forget to build common package `@convector-sample/common`, if something change, but first restart server

```shell
# build common library: this is required on fresh clones before lerna bootstrap else `Cannot find module '@convector-sample/common'`
$ npx lerna run build --scope @convector-sample/common --stream
```

```shell
# start debug (inside vscode)
$ npx lerna run start:debug --scope @convector-sample/server-graphql --stream
# start dev
$ npx lerna run start:dev --scope @convector-sample/server-graphql --stream
```

- [GraphQL Playground](http://localhost:3000/graphql)

```shell
# generate graphql types for frontend
$ npx lerna run gen:graphql --scope @convector-sample/frontend-react
```

```shell
# add dependencies
$ npx lerna add participant-cc --scope @convector-sample/server-graphql
$ npx lerna add person-cc --scope @convector-sample/server-graphql
$ npx lerna add common --scope @convector-sample/server-graphql
```

```shell
# in case of errors like Cannot find module '@convector-sample/common'.
$ npx lerna clean
$ npx lerna bootstrap
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

to use `any` in graphql we must implement a custom scalar type or use the [graphql-type-json](https://github.com/taion/graphql-type-json) package

- [Dynamic (Unique) Objects in GraphQl](https://stackoverflow.com/questions/33819658/dynamic-unique-objects-in-graphql)

```typescript
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class Attribute {
  @Field(type => GraphQLJSONObject)
  public content: any;
```

```
"message": "JSONObject cannot represent non-object value: 1993"
```

here we must convert "1993" into object ex `{ data: '1993' }` check function `convertAttributes`

after, test with more than on attribute with

```shell
# add some attributes
$ npx hurl invoke person person_addAttribute 1-100-101 '{"id": "graduated-year", "certifierID": "gov", "content": "1999", "issuedDate": 1554239270 }' -u admin
$ npx hurl invoke person person_addAttribute 1-100-101 '{"id": "marriage-year", "certifierID": "gov", "content": "2012", "issuedDate": 1554239270 }' -u admin
```

## Date Scalars

- [Date Scalars](https://typegraphql.ml/docs/scalars.html#date-scalars)

use date with convector models [post](Convector: what is the best way to store Date type in convector models?)
the trick is using epoch time in convector models and a Date scalar to convert from epoch to date and vs
check `packages/server-graphql/src/common/scalars/date.scalar.ts`

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

## Authentication Notes

```shell
# install the required packages
$ npx lerna add @nestjs/passport --scope @convector-sample/server-graphql --no-bootstrap
$ npx lerna add @nestjs/jwt --scope @convector-sample/server-graphql --no-bootstrap
$ npx lerna add passport --scope @convector-sample/server-graphql --no-bootstrap
$ npx lerna add passport-local --scope @convector-sample/server-graphql --no-bootstrap
$ npx lerna add bcrypt --scope @convector-sample/server-graphql --no-bootstrap
# dev
$ npx lerna add @types/passport-local --scope @convector-sample/server-graphql --dev --no-bootstrap
$ npx lerna add @types/passport-jwt --save-dev --scope @convector-sample/server-graphql --dev --no-bootstrap
# bootstrap
$ npx lerna bootstrap
```

```shell
# create modules and services
$ nest g module auth
$ nest g service auth
$ nest g module users
$ nest g service users
```

## Problem: Nest can't resolve dependencies of the GqlLocalAuthGuard

```
@convector-sample/server-graphql: [Nest] 14138   - 2019-09-15 21:21:30   [ExceptionHandler] Nest can't resolve dependencies of the GqlLocalAuthGuard (?). Please make sure that the argument at index [0] is available in the PersonModule context. +4ms

@convector-sample/server-graphql: [Nest] 15907   - 2019-09-15 21:25:25   [ExceptionHandler] Nest can't resolve dependencies of the GqlLocalAuthGuard (?). Please make sure that the argument at index [0] is available in the GqlLocalAuthGuard context. +234ms

@convector-sample/server-graphql: [Nest] 6421   - 2019-09-15 22:22:27   [ExceptionHandler] Nest can't resolve dependencies of the PersonService (?). Please make sure that the argument at index [0] is available in the PersonModule context. +69ms
```

this occurs because **we are imports services**, **never imports services**, **when we import module we already have access to all exported providers(services etc) from module**

> the trick to use `GqlLocalAuthGuard` in `PersonModule` is just import `AuthModule` in `PersonModule`

ex

```typescript
@Module({
  imports: [AuthModule],
  providers: [PersonResolver, PersonService, DateScalar],
})

export class PersonModule { }
```

## Awesome Link: Support AuthGuard

- [Support AuthGuard : GraphQL](https://github.com/nestjs/graphql/issues/48)

1. passing req to graphql context
2. auth guard GraphqlAuthGuard
3. user decorator
4. using user decorator in mutation

ideal for `personProfile.graphql`

used in `src/auth/gql-auth.guard.ts`

## Problem with `return super.canActivate(new ExecutionContextHost([req]))`

```
error TS2345: Argument of type 'ExecutionContextHost' is not assignable to parameter of type 'ExecutionContext'. Property 'getType' is missing in type 'ExecutionContextHost' but required in type 'ExecutionContext'.
```

- [NestJS Get current user in GraphQL resolver authenticated with JWT](https://stackoverflow.com/questions/55269777/nestjs-get-current-user-in-graphql-resolver-authenticated-with-jwt)

> Instead of implement your own `canActivate` method in your `GqlAuthGuard` you should create a `getRequest` method and return `GqlExecutionContext.create(context).getContext().req;`. This is a better approach in my opinion.

the fix is just use `getRequest()`  from nest docs (maybe this is new, after I implemented above canActivate method)

- [Nest graphql](https://docs.nestjs.com/techniques/authentication#graphql)

> In order to use an AuthGuard with GraphQL, extend the built-in AuthGuard class and override the getRequest() method.

remove old `canActivate` method and add official docs `getRequest` method and it works :)

old method

```typescript
canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
  // GqlExecutionContext exposes corresponding methods for each argument, like getArgs(), getContext()
  const ctx = GqlExecutionContext.create(context);
  const { req } = ctx.getContext();
  // the req parameter will contain a user property
  // (populated by Passport during the passport-local authentication flow)
// const authorization: string = (req.headers.authorization)
//   ? req.headers.authorization
//   : null;
// if (authorization) {
    // const token: string = authorization.toLowerCase().replace('bearer ', '');
    // const validToken = this.jwtService.verify(token);
  return super.canActivate(new ExecutionContextHost([req]));
// } else {
//   return false;
// }
}
```

new method

```typescript
@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
```

## @CurrentUser() decorator, to get @CurrentUser() in graphql endpoints like in personProfile

`packages/server-graphql/src/common/decorators/user.decorator.ts`

```typescript
@Query(returns => Person)
async personProfile(@CurrentUser() user: Person): Promise<Person> {
  return await this.personService.findOneByUsername(user.username);
}
```

## Getting headers in graphql

fix "Cannot read property 'headers' of undefined" graphql request

- [NestJS Execution context](https://docs.nestjs.com/graphql/tooling#execution-context)

- [Applying Middleware-like mechanism to Resolvers' Queries and Mutations](https://stackoverflow.com/questions/54532263/applying-middleware-like-mechanism-to-resolvers-queries-and-mutations)


- [Authentication: GraphQL Oficial Docs](https://docs.nestjs.com/techniques/authentication#graphql)

GraphQL Playground accepts cookie must change preferences `"request.credentials": "omit"` to `"request.credentials": "include"`

## Cookie Parser

- [Cookie Parser](https://www.npmjs.com/package/@nest-middlewares/cookie-parser)

- [NestJs Middleware](https://docs.nestjs.com/middleware)

```shell
$ curl -k --request POST \
  --url https://localhost:3443/refresh-token \
  --cookie jid=j%253A%257B%2522accessToken%2522%253A%2522eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphbmVkb2UiLCJpYXQiOjE1NjkyNzc0NjAsImV4cCI6MTU2OTg4MjI2MH0.A6XcwTvNZDUoT1MG6lFu7GyxVDg1GrTyTkjEFhvgDtI%2522%257D
```

```shell
# add cookie parser
$ npx lerna add @nest-middlewares/cookie-parser --scope @convector-sample/server-graphql
```

```typescript
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieParserMiddleware).forRoutes('/refresh-token');
  }
}
```

notes with `tokenVersion` we must:

1. login, and get cookie refreshToken
2. send refreshToken to /refresh-token, keep send this same refreshToken until we login, time when we increase tokenVersion and it will be invalidated

> never use `accessToken`, wrong secret, don't have `tokenVersion`

```shell
# refreshToken from cookie
$ TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphbmVkb2UiLCJ0b2tlblZlcnNpb24iOjUsImlhdCI6MTU2OTM2Mzg1MCwiZXhwIjoxNTY5OTY4NjUwfQ.ArD1yOMv_xrsUwveKur9Jyy03FKhvdvYZQaoY54KfGw
$ curl -k -v -X POST \
  --url https://localhost:3443/refresh-token \
  --cookie jid=${TOKEN}
```

## Apollo-Link-Token-Refresh and Migrate `apollo-boost` to `apollo-client`

- [apollo-link-token-refresh](https://github.com/newsiberian/apollo-link-token-refresh)
- [Apollo Boost migration](https://www.apollographql.com/docs/react/migrating/boost-migration/)

```shell
# install deps
$ npx lerna add apollo-link-token-refresh --scope @convector-sample/frontend-react --no-bootstrap
$ npx lerna add jwt-decode --scope @convector-sample/frontend-react --no-bootstrap
# types
$ npx lerna add @types/jwt-decode --scope @convector-sample/frontend-react --dev --no-bootstrap
# bootstrap
$ npx lerna bootstrap
```
