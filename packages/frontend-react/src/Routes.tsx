import React, { Fragment } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import { Home, Login, Profile, Register, Transactions } from './pages';
import State from './pages/State';

interface Props {
  logged?: boolean;
}

export const Routes: React.FC<Props> = ({ logged }: Props) => {
  let routes;
  let header = null;
  if (logged) {
    header = <Header />;
    routes = (
      <Fragment>
        <Route exact path='/' component={Home} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/transactions' component={Transactions} />
        <Route exact path='/state' component={State} />
      </Fragment>
    )
  } else {
    routes = (
      <Fragment>
        <Redirect to="/" />
        <Route exact path='/' component={Login} />
        <Route exact path='/register' component={Register} />
      </Fragment>
    );
  }

  return (
    <BrowserRouter>
      {header}
      <Switch>
        {routes}
      </Switch>
    </BrowserRouter>
  )
}
