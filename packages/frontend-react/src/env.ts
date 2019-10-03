export const envVariables: any = {
  restServerUri: process.env.REACT_APP_REST_SERVER_URI || 'https://localhost:443',
  graphqlServerUri: process.env.REACT_APP_GRAPHQL_SERVER_URI || `${process.env.SERVER_URI}/graphql`,
  // apollo
  apolloFetchPolicy: process.env.REACT_APP_APOLLO_FETCH_POLICY || 'cache-first',
  apolloRejectUnauthorized: process.env.REACT_APP_APOLLO_REJECT_UNAUTHORIZED || true,
};
