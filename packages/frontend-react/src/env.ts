export const envVariables: any = {
  restServerUri: process.env.REACT_APP_REST_SERVER_URI || 'https://localhost:443',
  graphqlServerUri: process.env.REACT_APP_GRAPHQL_SERVER_URI || `${process.env.SERVER_URI}/graphql`,
  // apollo : valid fetchPolicy values cache-first, cache-and-network, network-only, cache-only, no-cache
  apolloFetchPolicy: process.env.REACT_APP_APOLLO_FETCH_POLICY || 'cache-first',
  apolloRejectUnauthorized: process.env.REACT_APP_APOLLO_REJECT_UNAUTHORIZED || false,
};
