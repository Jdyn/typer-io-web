/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useDispatch } from 'react-redux';

import { wrapper } from '../store';
import { authenticate } from '../store/session/actions';
import { nicknameChanged, userRefreshed } from '../store/session/reducers';
import { ThemeProvider } from '../util/getInitialColorMode';

import '../public/static/styles/global.css';
import Layout from '../components/Layout';

((): void => {
  ReactGA.initialize('G-9DWL368WZS');
})();

interface IApp {
  Component: React.FC<{ err: string }>;
  pageProps: Record<string, unknown>;
  err: string;
}

export const App = (props: IApp): JSX.Element => {
  const { Component, pageProps, err } = props;
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
    if (nickname) dispatch(nicknameChanged(nickname));
  }, [dispatch]);

  return (
    <ThemeProvider>
      <Head>
        <title>Typer - Large multiplayer typing races with your friends</title>
        <meta
          name="description"
          content="Typer is a fast and modern multiplayer typing competition. Type against your friends in large 50+ player matches within a few clicks."
        />
      </Head>
      <Layout striped>
        <Component {...pageProps} err={err} />
      </Layout>
    </ThemeProvider>
  );
};

export default wrapper.withRedux(App);
