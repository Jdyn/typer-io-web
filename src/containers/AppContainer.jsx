import React, { Component, Fragment } from "react";
import Router from "../components/Router";
import Header from "../components/Header/index";
import { authenticate } from "../actions/SessionActions";
import { updateClient } from "../actions/ClientActions";
import Footer from "../components/Footer/Footer";
import * as Sentry from "@sentry/browser";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://429f27fd7aab4c2dac9d534a38ccfaf8@sentry.io/1396899",
    beforeSend(event) {
      if (event.exception) {
        Sentry.showReportDialog();
      }
      return event;
    }
  });
}

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
      <>
        <Header />
        <Router />
        <Footer />
      </>
    );
  }
}

export default App;
