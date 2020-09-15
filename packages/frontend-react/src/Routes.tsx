import { MuiThemeProvider } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { drawerCategories, drawerTitle } from './app/config';
import { theme } from './app/theme';
import { Header } from './components/Header';
import { ResponsiveDrawer } from './components/material-ui/navigation';
import { HomePage, PersonProfilePage, SignInPage, SignUpPage, StatePage, TransactionAddedPage } from './pages';

interface Props {
  logged?: boolean;
}

export const Routes: React.FC<Props> = ({ logged }: Props) => {
  // let routes;
  // let header = null;
  if (logged) {
    // header = <Header />;
    // routes = (
    //   <Fragment>
    //     <Route exact path='/' component={HomePage} />
    //     <Route exact path='/profile' component={ProfilePage} />
    //     <Route exact path='/transactions' component={TransactionPage} />
    //     <Route exact path='/state' component={StatePage} />
    //   </Fragment>
    // )
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <ResponsiveDrawer title={drawerTitle} categories={drawerCategories} />
        </MuiThemeProvider>
      </Router>
    );
  } else {
    // routes = (
    //   <Fragment>
    //     <Redirect to="/" />
    //     <Route exact path='/' component={SignInPage} />
    //     <Route exact path='/register' component={SignUpPage} />
    //   </Fragment>
    // );
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <Redirect to="/" />
          <Route exact path='/' component={SignInPage} />
          <Route exact path='/signup' component={SignUpPage} />
        </MuiThemeProvider>
      </Router>
    );
  }

  // return (
  //   <Router>
  //     <MuiThemeProvider theme={theme}>
  //       <ResponsiveDrawer title={drawerTitle} categories={drawerCategories} />
  //     </MuiThemeProvider>
  //   </Router>
  // );
}
