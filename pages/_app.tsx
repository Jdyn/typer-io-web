/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { GoogleAnalytics } from 'nextjs-google-analytics';

import { wrapper } from '../store';
import { authenticate } from '../store/session/actions';
import { nicknameChanged, userRefreshed } from '../store/session/reducers';
import { ThemeProvider } from '../util/getInitialColorMode';

import '../public/static/styles/global.css';

interface Props {
  Component: React.FC<{ err: string }>;
  pageProps: Record<string, unknown>;
  err: string;
}

export const App = ({ Component, ...rest }: Props): JSX.Element => {
  const { store, props } = wrapper.useWrappedStore(rest);

  const { dispatch } = store;

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
    <Provider store={store}>
      <ThemeProvider>
        <Head>
          <title>Typer - Large multiplayer typing races with your friends</title>
          <meta
            name="description"
            content="Typer is a fast and modern multiplayer typing competition. Type against your friends in large 50+ player matches within a few clicks."
          />
        </Head>
        <GoogleAnalytics trackPageViews gaMeasurementId="G-9DWL368WZS" />
        <Component {...props} err={props.err} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
