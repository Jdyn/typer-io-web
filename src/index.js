import React, { Fragment } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store/ConfigureStore";
import { loadState, saveState } from "./store/LocalStorage";
import App from "./containers/AppContainer";
import "./styles/global.css";

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

const app = (
  <>
    <BrowserRouter>
      <Provider store={store}>
        <App store={store} />
      </Provider>
    </BrowserRouter>
  </>
);

render(app, document.getElementById("root"));
