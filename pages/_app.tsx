import React, { useEffect, FunctionComponent } from 'react';
import { NextPage } from 'next';
import { useDispatch } from 'react-redux';
import * as Sentry from '@sentry/react';
import ReactGA from 'react-ga';
import Head from 'next/head';
import { wrapper } from '../store';
import '../public/static/styles/global.css';
import { authenticate } from '../store/session/actions';
import { userRefreshed, nicknameChanged } from '../store/session/reducers';

interface Props {
  Component: NextPage;
  pageProps: object;
}

((): void => {
  ReactGA.initialize('UA-135635293-4', {
    gaOptions: {
      siteSpeedSampleRate: 100
    }
  });
  ReactGA.pageview('/');
})();

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://429f27fd7aab4c2dac9d534a38ccfaf8@sentry.io/1396899'
  });
}

export const App = (props: Props): JSX.Element => {
  const { Component, pageProps } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (token) {
      dispatch(
        userRefreshed({
          isLoggedIn: true,
          user: {
            username,
            token
          }
        })
      );
      dispatch(authenticate());
    } else {
      dispatch(userRefreshed({ isLoggedIn: false, user: null }));
    }

    const nickname = localStorage.getItem('nickname');
    if (nickname) {
      dispatch(nicknameChanged(nickname));
    }
  }, [dispatch]);

  return (
    <Sentry.ErrorBoundary>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="application-name" content="typer.io" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Component {...pageProps} />
    </Sentry.ErrorBoundary>
  );
};

export default Sentry.withProfiler(wrapper.withRedux(App) as FunctionComponent);
