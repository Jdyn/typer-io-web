import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import * as route from '../constants/RounterConstants'
import Home from './Home'
import About from './About'
import Nav from '../components/Nav'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Nav />
          <Switch>
            <Route exact path={route.HOME_PATH} component={Home}/>
            <Route exact path={route.ABOUT_PATH} component={About}/>

            <Redirect to={route.HOME_PATH} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
