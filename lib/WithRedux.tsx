import React from 'react';
import { EnhancedStore } from '@reduxjs/toolkit';
import createStore from '../store';

let reduxStore: EnhancedStore;

const getStore = (initialState?: object): EnhancedStore => {
  if (typeof window === 'undefined') {
    return createStore(initialState);
  }

  if (!reduxStore) {
    reduxStore = createStore(initialState);
  }

  return reduxStore;
};

interface Props {
  state: EnhancedStore;
}

export default (App): React.ReactNode =>
  class WithRedux extends React.Component<Props> {
    store: object;

    static async getInitialProps(context): Promise<object> {
      const reduxStore = getStore();

      context.ctx.store = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(context);
      }

      return {
        ...appProps,
        state: reduxStore.getState()
      };
    }

    constructor(props: Props) {
      super(props);

      this.store = getStore(props.state);
    }

    render(): JSX.Element {
      return <App {...this.props} store={this.store} />;
    }
  };
