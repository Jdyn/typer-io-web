import React, { Component, Fragment } from 'react'
import Router from '../components/Router'
import Nav from '../components/Nav'

class App extends Component {
  render() {
    return (
        <Fragment>
          <Nav />
          <Router />
        </Fragment>
    );
  }
}

export default App;
