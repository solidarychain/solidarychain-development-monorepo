export type EnvConfig = {
  graphqlServerHttpProtocol: string;
  graphqlServerWsProtocol: string;
  graphqlServerHttpUri: string;
  graphqlServerWsUri: string;
  restServerHttpUri: string;
  apolloFetchPolicy: any;
  apolloRejectUnauthorized: boolean;
}

export const envVariables: EnvConfig = {
  // graphql
  graphqlServerHttpProtocol: process.env.REACT_APP_GRAPHQL_SERVER_HTTP_PROTOCOL,
  graphqlServerWsProtocol: process.env.REACT_APP_GRAPHQL_SERVER_WS_PROTOCOL,
  graphqlServerHttpUri: `${process.env.REACT_APP_GRAPHQL_SERVER_HTTP_PROTOCOL}://${process.env.REACT_APP_GRAPHQL_SERVER_URI}/graphql`,
  graphqlServerWsUri: `${process.env.REACT_APP_GRAPHQL_SERVER_WS_PROTOCOL}://${process.env.REACT_APP_GRAPHQL_SERVER_URI}/graphql`,
  // used to work with refresh-token
  restServerHttpUri: `${process.env.REACT_APP_GRAPHQL_SERVER_HTTP_PROTOCOL}://${process.env.REACT_APP_GRAPHQL_SERVER_URI}` || 'https://localhost:443',
  apolloFetchPolicy: process.env.REACT_APP_APOLLO_FETCH_POLICY || 'cache-first',
  apolloRejectUnauthorized: (process.env.REACT_APP_APOLLO_REJECT_UNAUTHORIZED === 'true') ? true : false || false,
  // TODO: remove
  // old config before apollo.client.ts
  // restServerUri: process.env.REACT_APP_REST_SERVER_URI || 'https://localhost:443',
  // graphqlServerUri: process.env.REACT_APP_GRAPHQL_SERVER_URI || `${process.env.SERVER_URI}/graphql`,
  // // apollo : valid fetchPolicy values cache-first, cache-and-network, network-only, cache-only, no-cache
  // apolloFetchPolicy: process.env.REACT_APP_APOLLO_FETCH_POLICY || 'cache-first',
  // apolloRejectUnauthorized: process.env.REACT_APP_APOLLO_REJECT_UNAUTHORIZED || false, 
};
