import * as React from 'react';
import { Link } from 'react-router-dom';
import { useStateValue, ActionType } from '../app/state';
import { setAccessToken } from '../common';
import { usePersonLogoutMutation } from '../generated/graphql';

interface Props { }

export const Header: React.FC<Props> = () => {
  // get hook
  const [state, dispatch] = useStateValue();
  // debug helper
  // const stateOutput = <pre>{JSON.stringify(state, undefined, 2)}</pre>;

  // DEPRECATED: now use state
  // this will use apollo cache, and this cache is modified in login, check `store.writeQuery` on Login.tsx
  // const { data, loading } = usePersonProfileQuery();

  // access apollo client to clear cache store on logout
  const [logout, { client }] = usePersonLogoutMutation();

  let body: any = null;

  // DEPRECATED: now use state
  // if (loading) {
  //   body = null;
  // } else if (data && data.personProfile) {
  //   body = <div>You are logged in as: {data.personProfile.username}</div>;
  // } else {
  //   body = <div>You are not logged in</div>
  // }

  return (
    <header>
      <div>
        <Link to='/'>home</Link>
      </div>
      <div>
        <Link to='/register'>register</Link>
      </div>
      <div>
        <Link to='/profile'>profile</Link>
      </div>
      <div>
        <Link to='/state'>state</Link>
      </div>
      {body}
      <div>
        {/* {!loading && data && data.personProfile ? (} */}
        {state.user.logged ? (
          <button onClick={async () => {
            // fire logoutMutation
            await logout();
            // clean inMemory accessToken
            setAccessToken('');
            // clear/reset apollo cache store
            await client!.resetStore()
              .catch(error => {
                console.error(error)
              });
            // dispatch logout
            dispatch({ type: ActionType.LOGOUT_USER });
          }
          }>logout</button>
        ) : null}
      </div>
    </header>
  );
}
