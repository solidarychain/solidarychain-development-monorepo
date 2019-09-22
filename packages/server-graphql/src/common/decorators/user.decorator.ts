// [CurrentUser = Custom Decorator](https://docs.nestjs.com/techniques/authentication#graphql)
// tslint:disable-next-line: max-line-length
// [NestJS Get current user in GraphQL resolver authenticated with JWT](https://stackoverflow.com/questions/55269777/nestjs-get-current-user-in-graphql-resolver-authenticated-with-jwt)
// not used yet
// use with @CurrentUser() decorator query/mutation

import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.req.user,
);
