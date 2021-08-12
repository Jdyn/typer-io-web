import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { userRefreshed, nicknameChanged } from '../store/session/reducers';
import { ThemeProvider } from '../util/getInitialColorMode';
import { authenticate } from '../store/session/actions';
import { wrapper } from '../store';

import '../public/static/styles/global.css';

// ((): void => {
//   ReactGA.initialize('UA-135635293-4', {});
// })();

interface IApp {
  Component: React.FC<{err: string}>;
  pageProps: Record<string, unknown>;
  err: string;
}

export const App = (props: IApp) => {
  const { Component, pageProps, err } = props;
  const dispatch = useDispatch();
  const [isReady, setReady] = useState(false);

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

    setReady(true);
  }, [dispatch]);

  return isReady ? (
    <ThemeProvider>
      <Component {...pageProps} err={err} />
    </ThemeProvider>
  ) : null;
};

export default wrapper.withRedux(App);
