import React, { Component, Fragment } from "react";
import Router from "../components/Router";
import Nav from "../components/Nav/Nav";
import CssBaseline from "../components/CssBaseline";
import { authenticate } from "../actions/SessionActions";
import { updateClient } from "../actions/ClientActions";
// import Footer from "../components/Footer/Footer";

class App extends Component {
  componentWillMount() {
    const token = localStorage.getItem("token");
    const localUsername = localStorage.getItem("username");

    const { dispatch } = this.props.store;
    if (token) {
      dispatch(authenticate());
    }
    if (localUsername) {
      dispatch(updateClient({ username: localUsername }));
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

export default App;
