import { useEffect, ReactNode } from 'react';
import ReactGA from 'react-ga';
import Head from 'next/head';
import Header from '../Header';
import styles from './index.module.css';

interface Props {
  children?: ReactNode;
  striped?: boolean;
}

const Layout = (props: Props): JSX.Element => {
  const { children, striped } = props;

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <>
      <Head>
        <title>Typer.io | Multiplayer Typing Test - Race Your Friends</title>
        <link
          rel="icon"
          href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/microsoft/209/racing-car_1f3ce.png"
        />
        <meta
          name="description"
          content="Online Multiplayer Typing Test - Improve your typing speed and race your friends. Practice on different texts and learn how to type faster."
        />
        <meta
          name="keywords"
          content="typing,free typing games,typing,typing test,typing lessons,wpm,typing software,typing game,typing practice,free typing program,typing games for kids,best typing game,typing skills,free typing test"
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
      <footer />
    </>
  );
};

Layout.defaultProps = {
  children: null,
  striped: false
};

export default Layout;
