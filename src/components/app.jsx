import Header from '../containers/header';
import Errors from '../containers/errors';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/home';
import Signin from '../containers/signin';
import Signout from '../containers/signout';
import Signup from '../containers/signup';
import Ressources from '../containers/ressources';
import requireAuth from '../helpers/require-authentification';
require('../style.css');
export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className='container body_content'>
          <Errors />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/ressources' component={requireAuth(Ressources)} />
            <Route exact path='/signin' component={Signin} />
            <Route exact path='/signout' component={Signout} />
            <Route exact path='/signup' component={Signup} />
          </Switch>
        </div>
      </div>
    );
  }
}
