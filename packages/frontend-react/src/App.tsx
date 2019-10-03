import * as React from 'react'
import { Routes } from './Routes';
import { useState } from 'react';
import { envVariables as e } from './env';
import { setAccessToken } from './common';
import { Loading } from './components';

interface Props { }

export const App: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true)
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  // on app mounts, request a new accessToken with cookie jid refreshToken, and set it in inMemory accessToken
  React.useEffect(() => {
    // require credentials to send jid cookie from browser
    fetch(`${e.restServerUri}/refresh-token`, {
      method: 'POST',
      credentials: 'include'
    })
      // hooks don't support async/await
      .then(async res => {
        // but here we can use it to await for json() Promise
        const data = await res.json();
        // disable loading, and let it pass to render Routes
        setLoading(false);
        setAccessToken(data.accessToken);
      })
      .catch(error => console.error(error));
    return () => {
      // cleanup stuff
    };
  }, [])

  if (loading) {
    return <Loading/>
  }

  return (<Routes />);
}