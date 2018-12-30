import React, { Fragment } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store/ConfigureStore";
import { loadState, saveState } from "./store/LocalStorage";
import { ThemeProvider } from "react-jss";
import App from "./containers/AppContainer";

const persistedStore = loadState();
const store = configureStore(persistedStore);

store.subscribe(() => {
  saveState({
    // object from state to save
  });
});

const theme = {
  primaryWhite: "#fafafa",
  secondaryWhite: "#f6f9fc",
  tertiaryWhite: "#eef2f7",
  quartinaryWhite: "#e6ebf1",
  primaryGrey: '#d7dadc',
  transparentGrey: "#80808017"
};

const app = (
  <Fragment>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </Fragment>
);

render(app, document.getElementById("root"));
