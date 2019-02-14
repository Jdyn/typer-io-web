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
console.log({matchHistory: store.getState().matchHistory})
store.subscribe(() => {
  saveState({
    matchHistory: store.getState().matchHistory
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
          <App store={store}/>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </Fragment>
);

render(app, document.getElementById("root"));
