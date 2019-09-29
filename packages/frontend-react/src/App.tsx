import * as React from 'react'
import { Routes } from './Routes';
import { useState } from 'react';
import { envVariables as e } from './env';

interface Props { }

export const App: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true)

  // on app mounts
  React.useEffect(() => {
    console.log(`${e.restServerUri}/refresh-token`);
    // require credentials to send jid cookie from browser
    fetch(`${e.restServerUri}/refresh-token`, {
      method: 'POST',
      credentials: 'include'
    })
      // hooks don't support async/await
      .then(async res => {
        // but here we can use it to await for json() Promise
        const data = await res.json();
        console.log(data)
        // setAccessToken(data.)
      })
      .catch(error => console.error(error));
    return () => {
      // cleanup
    };
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (<Routes />);
}