import Link from 'next/link';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.module.css';
import { AppState } from '../../store';
import { handleAuth } from '../../store/session/actions';
import { useRouter } from 'next/router';

const Header = (): JSX.Element => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form, setForm] = useState({ search: '' });

  const session = useSelector((state: AppState) => state.session);
  const authenticationRequest = useSelector(
    (state: AppState) => state.request.AUTHENTICATE
  );

  const logout = (event): void => {
    event.preventDefault();
    dispatch(handleAuth('logout', {}));
  };

  const navigate = (event): void => {
    event.preventDefault();

    setForm({ ...form, search: '' });
    router.push(`/u/${form.search}`);
  };

  return (
    <header className={styles.root}>
      <nav className={styles.container}>
        <Link prefetch={false} href="/">
          <a className={styles.logo}>typer.io</a>
        </Link>
        <div className={styles.nav}>
          <Link prefetch={false} href="/">
            <a>home</a>
          </Link>
          <Link prefetch={false} href="/forum">
            <a>discuss</a>
          </Link>
          <a
            href="https://www.buymeacoffee.com/typer"
            target="_blank"
            rel="noreferrer"
          >
            support
          </a>
        </div>
        <div className={styles.searchContainer}>
          <form onSubmit={navigate}>
            <input
              id="header-search"
              type="text"
              placeholder="Search for players..."
              className={styles.search}
              value={form.search}
              onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                setForm({
                  ...form,
                  search: event.target.value
                })
              }
            />
            <label hidden htmlFor="header-search">Search for users</label>
          </form>
        </div>
        {!authenticationRequest?.isPending ? (
          <>
            {session.isLoggedIn ? (
              <div className={styles.authContainer}>
                <Link href={`/u/${session?.user?.username}`}>
                  <span className={styles.button}>Profile</span>
                </Link>
                <button
                  type="button"
                  className={styles.button}
                  onClick={logout}
                >
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
