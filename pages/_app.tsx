import React, { useEffect } from 'react';
import { NextPage } from 'next';
import cookies from 'js-cookie';
import { wrapper } from '../store';
import '../public/static/styles/global.css';
import { useDispatch } from 'react-redux';
import { handleAuth, authenticate } from '../store/session/actions';
import { userRefreshed } from '../store/session/reducers';

interface Props {
  Component: NextPage;
  pageProps: object;
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
  }, [dispatch]);

  return <Component {...pageProps} />;
};

export default wrapper.withRedux(App);
