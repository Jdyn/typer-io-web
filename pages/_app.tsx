import React, { useEffect, FunctionComponent } from 'react';
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
      <Component {...pageProps} />
    </Sentry.ErrorBoundary>
  );
};

export default Sentry.withProfiler(wrapper.withRedux(App) as FunctionComponent);
