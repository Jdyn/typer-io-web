import Link from 'next/link';
import React from 'react';
import styles from './index.module.css';

const Footer = (): JSX.Element => {
  return (
    <footer className={styles.root}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <span>© 2021 Typer.io | All Rights Reserved</span>
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
                <Link href="/forum">
                  <a>Posts</a>
                </Link>
              </li>
              <li>
                <Link href="/forum/post">
                  <a>Create Post</a>
                </Link>
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
          {/* <div className={styles.content}>
            <h3>Orders</h3>
            <ul>
              <Link prefetch={false} href="/demo">
                <li>View Demo</li>
              </Link>
              <Link prefetch={false} href="/order/track">
                <li>Find Order</li>
              </Link>
              <Link prefetch={false} href="/boost">
                <li>Order Boost</li>
              </Link>
            </ul>
          </div> */}
        </div>
        <div />
      </div>
    </footer>
  );
};

export default Footer;
