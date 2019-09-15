// tslint:disable-next-line: max-line-length
// [NestJS Get current user in GraphQL resolver authenticated with JWT](https://stackoverflow.com/questions/55269777/nestjs-get-current-user-in-graphql-resolver-authenticated-with-jwt)

// not used yet

// use in @CurrentUser() decorator query/mutation
// @Query(returns => User)
// @UseGuards(GqlAuthGuard)
// whoami(@CurrentUser() user: User) {
//   console.log(user);
//   return this.userService.findByUsername(user.username);
// }

import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data, req) => req.user,
);
