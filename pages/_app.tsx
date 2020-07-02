import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useDispatch } from 'react-redux';
import * as Sentry from '@sentry/react';
import ReactGA from 'react-ga';
import cookies from 'js-cookie';
import { wrapper } from '../store';
import '../public/static/styles/global.css';
import { authenticate } from '../store/session/actions';
import { userRefreshed, nicknameChanged } from '../store/session/reducers';

interface Props {
  Component: NextPage;
  pageProps: object;
}

((): void => {
  ReactGA.initialize('UA-135635293-4');
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
    const token = cookies.get('token');

    if (token) {
      dispatch(authenticate());
    } else {
      dispatch(userRefreshed({ isLoggedIn: false, user: null }));
    }

    const username = localStorage.getItem('username');
    if (username) {
      dispatch(nicknameChanged(username));
    }
  }, [dispatch]);

  return (
    <Sentry.ErrorBoundary>
      <Component {...pageProps} />
    </Sentry.ErrorBoundary>
  );
};

export default Sentry.withProfiler(wrapper.withRedux(App));
