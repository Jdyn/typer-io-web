import React from "react";
import { ThemeProvider } from "react-jss";
import { authenticate } from "../actions/SessionActions";
import { updateClient } from "../actions/ClientActions";
import ErrorBoundary from "../containers/ErrorBoundary";
import Baseline from "../components/Baseline";
import Router from "../components/Router";
import * as Sentry from "@sentry/browser";
import theme from "../lib/theme";
import Header from "../components/Header";

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

class App extends React.Component {
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
        <ThemeProvider theme={theme.light}>
          <Baseline>
            <ErrorBoundary>
              <Header />
              <Router />
            </ErrorBoundary>
          </Baseline>
        </ThemeProvider>
      </>
    );
  }
}

export default App;
