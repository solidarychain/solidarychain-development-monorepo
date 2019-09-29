export const envVariables: any = {
  restServerUri: process.env.REACT_APP_REST_SERVER_URI || 'https://localhost:443',
  graphqlServerUri: process.env.REACT_APP_GRAPHQL_SERVER_URI || `${process.env.SERVER_URI}/graphql`,
};
