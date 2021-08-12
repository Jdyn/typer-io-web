/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import styles from './index.module.css';
import { AppState } from '../../store';
import { handleAuth } from '../../store/session/actions';
import { ThemeContext } from '../../util/getInitialColorMode';
import Dropdown from './Dropdown/AuthDisplay';
import sun from '../../public/static/images/sun.svg';
import moon from '../../public/static/images/moon.svg';

const Header = (): JSX.Element => {
  const router = useRouter();
  const [form, setForm] = useState({ search: '' });

  const session = useSelector((state: AppState) => state.session);
  const authenticationRequest = useSelector((state: AppState) => state.request.AUTHENTICATE);

  const navigate = (event): void => {
    event.preventDefault();

    setForm({ ...form, search: '' });
    router.push(`/u/${form.search}`);
  };

  return (
    <ThemeContext.Consumer>
      {({ theme, setTheme }) => (
        <header className={styles.root}>
          <div className={styles.container}>
            <Link prefetch={false} href="/">
              <a href="/" className={styles.logo}>
                TYPER.IO
              </a>
            </Link>
            <nav className={styles.nav}>
              <Link prefetch={false} href="/">
                <a href="/">home</a>
              </Link>
              <Link prefetch={false} href="/forum?page=1">
                <a href="/forum">discuss</a>
              </Link>
              <Link prefetch={false} href="/hiscores?query=top_speed&page=1&type=all">
                <a href="/hiscores?query=top_speed&page=1&type=all">hiscores</a>
              </Link>
            </nav>
            <div className={styles.searchContainer}>
              <form onSubmit={navigate}>
                <input
                  id="header-search"
                  type="text"
                  placeholder="Search for players..."
                  className={styles.search}
                  value={form.search}
                  onChange={(event: ChangeEvent<HTMLInputElement>): void =>
                    setForm({
                      ...form,
                      search: event.target.value
                    })
                  }
                />
                <label hidden htmlFor="header-search">
                  Search for users
                </label>
              </form>
            </div>
            <button
              type="button"
              className={styles.button}
              style={{ width: 'auto' }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Image quality="45" width="26px" height="26px" src={sun} alt="light-mode sun" />
              ) : (
                <Image quality="45" width="26px" height="26px" src={moon} alt="dark-mode moon" />
              )}
            </button>
            <Dropdown
              handleAuth={handleAuth}
              session={session}
              sessionRequest={authenticationRequest}
            />
          </div>
        </header>
      )}
    </ThemeContext.Consumer>
  );
};

export default Header;
