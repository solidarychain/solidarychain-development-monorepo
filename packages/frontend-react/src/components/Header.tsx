import * as React from 'react'
import { Link } from 'react-router-dom';
import { usePersonProfileQuery } from '../generated/graphql';

interface Props { }

export const Header: React.FC<Props> = () => {
  const { data } = usePersonProfileQuery();
  
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
      {data && data.personProfile.username && (
        <div>You are logged in as: {data.personProfile.username}</div>
      )}
    </header>
  );
}