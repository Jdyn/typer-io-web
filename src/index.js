import React, { Fragment } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store/ConfigureStore";
import { loadState, saveState } from "./store/LocalStorage";
import { ThemeProvider } from "react-jss";
import ErrorBoundary from "./containers/ErrorBoundary";
import App from "./containers/AppContainer";
import Baseline from "./components/Baseline";

const persistedStore = loadState();
const store = configureStore(persistedStore);
store.subscribe(() => {
  saveState({
    matchHistory: store.getState().matchHistory,
    session: {
      ...store.getState().session,
      errored: false,
      errors: {},
      error: ""
    }
  });
});

const theme = {
  primaryWhite: "#fafafa",
  secondaryWhite: "#f6f9fc",
  tertiaryWhite: "#eef2f7",
  quartinaryWhite: "#e6ebf1",
  primaryGrey: "#d7dadc",
  transparentGrey: "#80808017",
  divider: "rgba(0, 0, 0, 0.05)",
  fontColor: "#222222"
};

const app = (
  <Fragment>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <ErrorBoundary>
            <Baseline>
              <App store={store} />
            </Baseline>
          </ErrorBoundary>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </Fragment>
);

render(app, document.getElementById("root"));
