import React, { Component, Fragment } from 'react'
import Router from '../components/Router'
import TopHeader from '../components/topHeader/TopHeader'

class App extends Component {
  render() {
    return (
        <Fragment>
          <TopHeader />
          <Router />
        </Fragment>
    );
  }
}

export default App;
