import React, { Component, Fragment } from "react";
import Router from "../components/Router";
import Nav from "../components/Nav/Nav";
import CssBaseline from "../components/CssBaseline";
// import Footer from "../components/Footer/Footer";

class App extends Component {

  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Nav />
        <Router />
        {/* <Footer /> */}
      </Fragment>
    );
  }
}

export default App;
