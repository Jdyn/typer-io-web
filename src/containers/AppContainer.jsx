import React, { Component, Fragment } from "react";
import Router from "../components/Router";
import Nav from "../components/Nav/Nav";
import CssBaseline from "../components/CssBaseline";
import { authenticate } from "../actions/SessionActions";
// import Footer from "../components/Footer/Footer";

class App extends Component {
  componentWillMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.props.store.dispatch(authenticate())
    }
  }

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

export default App
