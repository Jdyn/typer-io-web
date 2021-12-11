import Link from 'next/link';
import React from 'react';
import styles from './index.module.css';

const Footer = (): JSX.Element => {
  return (
    <footer className={styles.root}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <span>© 2021 Typer.io</span>
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
                  <a>Quick Play</a>
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/solo">
                  <a>Solo Play</a>
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/lobby">
                  <a>Custom Play</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.content}>
            <h3>Forums</h3>
            <ul>
              <li>
                <Link prefetch={false} href="/forum">
                  <a>Posts</a>
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/forum/post">
                  <a>Create Post</a>
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
                  <a>Log In</a>
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/signup">
                  <a>Sign Up</a>
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

export default Footer;
