import * as React from 'react'
import { Link } from 'react-router-dom';
import { usePersonProfileQuery, usePersonLogoutMutation } from '../generated/graphql';
import { setAccessToken } from '../common';

interface Props { }

export const Header: React.FC<Props> = () => {
  // this will use apollo cache, and this cache is modified in login, check `store.writeQuery` on Login.tsx
  const { data, loading } = usePersonProfileQuery();
  // access apollo client to clear cache store on logout
  const [logout, { client }] = usePersonLogoutMutation();

  let body: any = null;
  if (loading) {
    body = null;
  } else if (data && data.personProfile) {
    body = <div>You are logged in as: {data.personProfile.username}</div>;
  } else {
    body = <div>You are not logged in</div>
  }

  return (
    <header>
      <div>
        <Link to='/'>home</Link>
      </div>
      <div>
        <Link to='/register'>register</Link>
      </div>
      <div>
        <Link to='/login'>login</Link>
      </div>
      <div>
        <Link to='/profile'>profile</Link>
      </div>
      {body}
      <div>
        {!loading && data && data.personProfile ? (
          <button onClick={async () => {
            await logout();
            // clean inMemory accessToken
            setAccessToken('');
            // clear/reset apollo cache store
            // check chrome devTools for apollo, we see empty cache
            await client!.resetStore()
              .catch(error => {
                console.error(error)
              });
          }
          }>logout</button>
        ) : null}
      </div>
    </header>
  );
}
