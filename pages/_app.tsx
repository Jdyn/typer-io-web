import React from 'react';
import { Provider } from 'react-redux';
import { NextPage } from 'next';
import withRedux from '../lib/WithRedux';
import '../public/static/styles/global.css';

interface Props {
  Component: NextPage;
  pageProps: object;
  store: object;
}

export const App = (props: Props): JSX.Element => {
  const { Component, store, pageProps } = props;

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

App.getInitialProps = async ({ Component, ctx }): Promise<object> => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default withRedux(App);
