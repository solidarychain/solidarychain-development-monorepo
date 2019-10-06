import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Register, Login, Home } from './pages';
import { Header } from './components/Header';
import { Profile } from './pages/Profile';
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
        <Route exact path='/register' component={Register} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/state' component={State} />
      </Fragment>
    )
  } else {
    routes = (
      <Fragment>
        <Route exact path='/' component={Login} />
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
