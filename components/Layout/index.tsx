import Head from 'next/head';
import { ReactNode, useEffect } from 'react';
import ReactGA from 'react-ga4';

import Footer from '../Footer';
import Header from '../Header';
import styles from './index.module.css';

interface Props {
  children?: ReactNode;
  striped?: boolean;
  title?: string;
  description?: string;
  ogTitle?: string;
}

const Layout = (props: Props): JSX.Element => {
  const { children, striped, title, description, ogTitle } = props;

  useEffect(() => {
    ReactGA.send('pageview');
  }, [children]);

  return (
    <>
      <Head>
        <title>{`Typer - ${title}` || 'Typer - The Modern Multiplayer Typing Race'}</title>
        <link
          rel="icon"
          href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/microsoft/209/racing-car_1f3ce.png"
        />
        <meta
          name="description"
          content={
            description ||
            'Typer is a fast and modern multiplayer typing competition. Type against your friends in large 50+ player matches with a few clicks.'
          }
        />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
        />
        <meta
          name="og:description"
          content={
            description ||
            'Typer is a fast and modern multiplayer typing competition. Type against your friends in large 50+ player matches with a few clicks.'
          }
        />
        <meta property="og:title" content={ogTitle} />
      </Head>
      <Header />
      {striped && <div className={styles.stripe} />}
      {children}
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  children: null,
  striped: false,
  title: 'Typer | Multiplayer Typing Test - Race Your Friends',
  ogTitle: '',
  description:
    'The Online Multiplayer Typing Test - Improve your speed and race your friends. Practice on different texts and learn how to type faster.'
};

export default Layout;
