## ToDo

refactor all constants
refactor env.ts








- [W] Swagger Docs
  - [ ] Finish all `@ApiOperation` and `@ApiResponse`
  - [ ] Add JWT to Api, and Login User (User must be created by organization, can be attributed to oauth2 account like gmail)
  - [ ] Root show Read Me or Redirect to React FrontEnd

- [ ] Ledger authentication, ex users are created in a ledger by one organization, that creates user and its password, store users auth on ledger on couchdb
  - `packages/server/src/auth/jwt.strategy.ts` For example, we could do a database lookup in our validate() method to extract more information about the user, resulting in a more enriched user object being available in our Request. This is also the place we may decide to do further token validation, such as looking up the userId in a list of revoked tokens, enabling us to perform token revocation



- [ ] env.ts refactor to be used has `e.SWAGGER_MODULE_TITLE`
- [ ] Create Endpoint GetAll Participants
- [ ] Change `io.worldsibu.examples.participant` to `io.worldsibu.participant` (must renew ledger)
- [ ] Https and CORS
- [ ] Change README.md
- [ ] Extract business rules to separate file to implement UI
- [ ] Add tests from couchdb tutorial
- [ ] Debug SmartContract
- [ ] Graph Explorer
- [ ] GraphQL
- [D] Create GitLab Repository for project `NodeNestJsHyperLedgerConvectorRestStarter`
- [D] Can't duplicate same attribute ex can have 2 birth-year's ?
  - Try to update birth-year

- [ ] Branch final project, and add Type GraphQL
