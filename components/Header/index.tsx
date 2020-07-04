import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.module.css';
import { AppState } from '../../store';
import { handleAuth } from '../../store/session/actions';

interface Props {
  children?: React.ReactNode;
}

const Header = (): JSX.Element => {
  const dispatch = useDispatch();
  const session = useSelector((state: AppState) => state.session);
  const authenticationRequest = useSelector((state: AppState) => state.request.AUTHENTICATE);

  const logout = (event) => {
    event.preventDefault();
    dispatch(handleAuth('logout', {}));
  };

  return (
    <header className={styles.root}>
      <nav className={styles.container}>
        <Link href="/">
          <a className={styles.logo}>typer.io</a>
        </Link>
        <div className={styles.nav}>
          <Link href="/">
            <a>home</a>
          </Link>
          <Link href="/forum">
            <a>discuss</a>
          </Link>
        </div>
        {!authenticationRequest?.isPending ? (
          <>
            {session.isLoggedIn ? (
              <div className={styles.authContainer}>
                Logged in as {session?.user?.username}{' '}
                <button type="button" className={styles.button} onClick={logout}>
                  log out
                </button>
              </div>
            ) : (
              <div className={styles.authContainer}>
                <Link href="/login">
                  <a>log in</a>
                </Link>
                <Link href="/signup">
                  <a>sign up</a>
                </Link>
              </div>
            )}
          </>
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
