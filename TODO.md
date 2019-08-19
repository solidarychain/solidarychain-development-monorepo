# ToDo

- [D] Swagger Docs
  - [D] Finish all `@ApiOperation` and `@ApiResponse`
  - [D] Add JWT to Api, and Login User with moked UserService
  - [ ] Root show Read Me or Redirect to React FrontEnd
- [D] Can't duplicate same attribute ex can have 2 birth-year's ?
  - Try to update birth-year
- [D] env.ts refactor to be used has `e.swaggerModuleTitle`
- [D] Create Endpoint GetAll Participants
- [D] Https and CORS
- [D] Create GitLab Repository for project `NodeNestJsHyperLedgerConvectorRestStarter`

- [ ] Ledger authentication, ex users are created in a ledger by one organization, that creates user and its password, store users auth on ledger on couchdb
  - `packages/server/src/auth/jwt.strategy.ts` For example, we could do a database lookup in our validate() method to extract more information about the user, resulting in a more enriched user object being available in our Request. This is also the place we may decide to do further token validation, such as looking up the userId in a list of revoked tokens, enabling us to perform token revocation
  
  (User must be created by organization, can be attributed to oauth2 account like gmail)

- [ ] Change `io.worldsibu.examples.participant` to `io.worldsibu.participant` (must renew ledger)
- [ ] Change README.md
- [ ] Extract business rules to separate file to implement UI
- [ ] Add tests from couchdb tutorial
- [ ] Debug SmartContract
- [ ] Explore the Blocks <https://docs.worldsibu.com/article/92-explore-blocks>
- [ ] CouchDb UserService <https://docs.worldsibu.com/article/101-tutorial-advanced-couchdb#direct-couchdb>
- [ ] Branch/TAG final REST project, and fork it to start TypeGraphQL
- [ ] Nest.js/GraphQL with AuthGuards
