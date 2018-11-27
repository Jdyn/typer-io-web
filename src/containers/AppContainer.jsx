import React, { Component, Fragment } from "react";
import Router from "../components/Router";
import TopHeader from "../components/Header";
import CssBaseline from "../components/CssBaseline";

class App extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <TopHeader />
        <Router />
      </Fragment>
    );
  }
}

export default App;
