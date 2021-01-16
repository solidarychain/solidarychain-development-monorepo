import { CurrentUser, UserRoles } from "@solidary-chain/common-cc";

// stub
const GRAPHQL_PLAYGROUND_PATH: string = '/graphql';
const API_RESPONSE_INTERNAL_SERVER_ERROR: string = 'Internal server error';
const CURRENT_USER_ADMIN_ROLE: CurrentUser = { userId: null, username: null, roles: [UserRoles.ROLE_ADMIN, UserRoles.ROLE_USER] };

export const appConstants = {
  GRAPHQL_PLAYGROUND_PATH,
  API_RESPONSE_INTERNAL_SERVER_ERROR,
  CURRENT_USER_ADMIN_ROLE,
};
