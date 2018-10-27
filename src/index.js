import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import configureStore from './store/ConfigureStore'
import { loadState, saveState } from './store/LocalStorage'
import App from './containers/App';

const persistedStore = loadState()
const store = configureStore(persistedStore)

store.subscribe(() => {
  saveState({
    // object from state to save
  })
})

const app = (
  <Fragment>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Fragment>
)

render(app, document.getElementById("root"))
