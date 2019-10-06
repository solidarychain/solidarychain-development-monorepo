import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, Observable } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import https from 'https';
import jwtDecode from 'jwt-decode';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { getAccessToken, setAccessToken } from './common';
import { envVariables as e } from './env';
import { StateProvider } from './app/state/useStateValue';
import reducer, { initialState } from './app/state/reducerStateValue';

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// use default InMemoryCache
const cache = new InMemoryCache({});

// apolloLinkTokenRefresh
const refreshLink = new TokenRefreshLink({
  // define accessToken field
  accessTokenField: 'accessToken',
  // check if current accessToken is valid
  isTokenValidOrUndefined: () => {
    const accessToken = getAccessToken();
    // invalid Token
    if (!accessToken) {
      return true;
    }
    // check if valid Token is not Expired
    try {
      const { exp } = jwtDecode(accessToken);
      // if current time is greater than exp
      return (Date.now() >= exp * 1000) ? false : true;
    } catch (error) {
      return false;
    }
  },
  // if not valid, request a new accessToken with refreshToken
  fetchAccessToken: () => {
    return fetch(`${e.restServerUri}/refresh-token`, {
      method: 'POST',
      credentials: 'include',
    });
  },
  // handle fetch accessToken
  handleFetch: accessToken => {
    // set inMemory accessToken
    setAccessToken(accessToken);
  },
  // handle Response
  // handleResponse: (operation, accessTokenField) => response => {
  //   // here you can parse response, handle errors, prepare returned token to
  //   // further operations
  //   // returned object should be like this:
  //   // {
  //   //    access_token: 'token string here'
  //   // }
  // },
  handleError: err => {
    // full control over handling token fetch Error
    console.warn('Your refresh token is invalid. Try to relogin');
    console.error(err);
    // your custom action here
    // user.logout();
  }
});

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle: any;
    Promise.resolve(operation)
      .then(operation => {
        // get inMemory accessToken from global variable
        const accessToken = getAccessToken();
        // if have accessToken, add authorization headers
        if (accessToken) {
          operation.setContext({
            headers: {
              authorization: accessToken ? `Bearer ${accessToken}` : ''
            }
          })
        }
      })
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));
    return () => {
      if (handle) handle.unsubscribe();
    };
  })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    // apolloLinkTokenRefresh
    refreshLink,
    // normal apolloLink stuff
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.error(graphQLErrors);
      }
      if (networkError) {
        console.error(networkError);
      }
    }),
    requestLink,
    new HttpLink({
      uri: e.graphqlServerUri,
      fetchOptions: {
        // How to avoid "self signed certificate" error?
        agent: new https.Agent({ rejectUnauthorized: e.apolloRejectUnauthorized }),
      },
      // required, else we can't receive jid cookie
      credentials: 'include',
    })
  ]),
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    {/* wrap with state provider */}
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </ApolloProvider>
  , document.getElementById('root')
);
