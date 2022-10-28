/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, useState, memo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './index.module.css';
import { ThemeContext } from '../../util/getInitialColorMode';
import Dropdown from './Dropdown/AuthDisplay';
import sun from '../../public/static/images/sun.svg';
import moon from '../../public/static/images/moon.svg';
import home from '../../public/static/images/home.svg';
import chatBubble from '../../public/static/images/chat-bubble.svg';
import rocket from '../../public/static/images/rocket.svg';

const Header = (): JSX.Element => {
  const router = useRouter();
  const [form, setForm] = useState({ search: '' });

  const navigate = (event): void => {
    event.preventDefault();

    setForm({ ...form, search: '' });
    router.push(`/search/${form.search}`);
  };

  return (
    <ThemeContext.Consumer>
      {({ theme, setTheme }) => (
        <header className={styles.root}>
          <div className={styles.container}>
            <Link prefetch={false} href="/" className={styles.logo}>
              TYPER.IO
            </Link>
            <nav className={styles.nav}>
              <Link className={styles.navItem} prefetch={false} href="/">
                <Image
                  alt="Home"
                  className={styles.navImage}
                  src={home}
                  width="26"
                  height="26"
                  priority
                />
                <span>Home</span>
              </Link>
              <Link prefetch={false} className={styles.navItem} href="/forum?page=1">
                <Image
                  className={styles.navImage}
                  src={chatBubble}
                  width="26"
                  height="26"
                  alt="Discuss"
                  priority
                />
                <span>Discuss</span>
              </Link>
              <Link
                className={styles.navItem}
                prefetch={false}
                href="/hiscores?query=top_speed&page=1&type=all"
              >
                <Image
                  className={styles.navImage}
                  src={rocket}
                  width="26"
                  height="26"
                  alt="Hiscores"
                  priority
                />
                <span>Hiscores</span>
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
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Image
                  priority
                  quality="45"
                  width="24"
                  height="24"
                  src={sun}
                  alt="light-mode sun"
                />
              ) : (
                <Image
                  priority
                  quality="45"
                  width="24"
                  height="24"
                  src={moon}
                  alt="dark-mode moon"
                />
              )}
            </button>
            <Dropdown />
          </div>
        </header>
      )}
    </ThemeContext.Consumer>
  );
};

export default memo(Header);
