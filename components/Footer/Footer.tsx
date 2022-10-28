import Link from 'next/link';
import React, { memo } from 'react';
import styles from './index.module.css';

const Footer = (): JSX.Element => {
  return (
    <footer className={styles.root}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <span>© 2022 Typer.io</span>
          <div>
            created by <a href="https://github.com/jdyn">Jaden</a>
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.content}>
            <h3>Races</h3>
            <ul>
              <li>
                <Link prefetch={false} href="/play">
                  Quick Play
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/solo">
                  Solo Play
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/lobby">
                  Custom Play
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.content}>
            <h3>Forums</h3>
            <ul>
              <li>
                <Link prefetch={false} href="/forum">
                  Posts
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/forum/post">
                  Create Post
                </Link>
              </li>
              <li>
                <a href="https://discord.gg/E2Fj4h3JCa" target="_blank" rel="noreferrer">
                  Discord
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.content}>
            <h3>Account</h3>
            <ul>
              <li>
                <Link prefetch={false} href="/login">
                  Log In
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/signup">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/u/reset">
                  Recover
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div />
      </div>
    </footer>
  );
};

export default memo(Footer);
