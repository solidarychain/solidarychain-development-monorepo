import { GraphQLClient, gql } from 'graphql-request'

const endpoint = 'https://api.solidarychain.com/graphql';
const adminUsername = 'admin';
const adminPassword = 'Aa123#12';
const defaultPassword = 'Aa456#45';


const getUserToken = async (username, password) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    // headers: {
    //   authorization: 'Bearer MY_TOKEN',
    // },
  });

  const mutation = gql`
    mutation personLogin($loginPersonData: LoginPersonInput!) {
      personLogin(loginPersonData: $loginPersonData) {
        accessToken
        user {
          id
          username
          email
          roles
        }
      }
    }`;

  const variables = {
    loginPersonData: {
      username,
      password,
    }
  };

  const data = await graphQLClient.request(mutation, variables)
  const { personLogin: { accessToken } } = data;
  return accessToken;
};

const invokeRequest = async (request, variables, token) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return await graphQLClient.request(request, variables);
}

async function main() {
  // get admin token
  console.log(`invoke getUserToken('adminUsername', 'adminPassword')`)
  const adminToken = await getUserToken(adminUsername, adminPassword);

  // queryParticipants
  const queryParticipants = gql`
    query participants($skip: Int, $take: Int) {
      participants(skip: $skip, take: $take) {
        id
        code
        name
        email
        ambassadors
      }
    }`;
  const queryParticipantsVariables = {
    skip: 0,
    take: 10,
  };
  console.log(`invoke await invokeRequest(queryParticipants, queryParticipantsVariables, adminToken)`);
  const queryParticipantsData = await invokeRequest(queryParticipants, queryParticipantsVariables, adminToken);
  console.log(`queryParticipantsData: [${JSON.stringify(queryParticipantsData, undefined, 2)}]`);
};

main().catch((error) => console.error(error));
