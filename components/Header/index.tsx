import React from 'react';
import Link from 'next/link';
import styles from './index.module.css';

interface Props {
  children?: React.ReactNode;
}

const Header = (): JSX.Element => {
  return (
    <header className={styles.root}>
      <div className={styles.container}>
        <Link href="/">
          <h1 className={styles.logo}>typer.io</h1>
        </Link>
        <ul className={styles.nav}>
          <Link href="/">
            <li>home</li>
          </Link>
          <Link href="/forum">
            <li>discuss</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
