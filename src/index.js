import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from './containers/App';
import configureStore from './store/ConfigureStore'

const store = configureStore()

function render(Component) {
  ReactDOM.render(
    <Provider store={store}>
      <Component/>
    </Provider>,
  document.getElementById('root'));
}

render(App)
