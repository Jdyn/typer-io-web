import Head from 'next/head';
import { ReactNode, useEffect } from 'react';
import ReactGA from 'react-ga';

import Footer from '../Footer';
import Header from '../Header';
import styles from './index.module.css';

interface Props {
  children?: ReactNode;
  striped?: boolean;
  title?: string;
  description?: string;
}

const Layout = (props: Props): JSX.Element => {
  const { children, striped, title, description } = props;

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [children]);

  return (
    <>
      <Head>
        <title>{title || 'Typer | The Modern Multiplayer Typing Race'}</title>
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
          name="keywords"
          content="typer,typing,free typing games,typing,typing test,typing lessons,wpm,typing software,typing game,typing practice,free typing program,typing games for kids,best typing game,typing skills,free typing test"
        />
        <meta
          name="google-site-verification"
          content="Pww56fm4UvyzFeLppncS1u27xlhznlaFsSzwpVrtbqE"
        />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
        />
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
  description:
    'The Online Multiplayer Typing Test - Improve your speed and race your friends. Practice on different texts and learn how to type faster.'
};

export default Layout;
