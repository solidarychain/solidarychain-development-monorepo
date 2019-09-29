import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Register, Login, Home } from './pages';
import { Header } from './components/Header';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
