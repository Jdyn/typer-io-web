import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ReactGA from 'react-ga';
import { wrapper } from '../store';
import '../public/static/styles/global.css';
import { authenticate } from '../store/session/actions';
import { userRefreshed, nicknameChanged } from '../store/session/reducers';
import { ThemeProvider } from '../util/getInitialColorMode';

((): void => {
  ReactGA.initialize('UA-135635293-4', {});
})();

export const App = (props): JSX.Element => {
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
