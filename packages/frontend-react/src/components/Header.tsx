import * as React from 'react'
import { Link } from 'react-router-dom';

interface Props { }

export const Header: React.FC<Props> = () => {
  return (
    <div>
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
    </div>
  );
}