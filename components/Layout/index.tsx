import { useEffect, ReactNode } from 'react';
import ReactGA from 'react-ga';
import Head from 'next/head';
import Header from '../Header';
import styles from './index.module.css';
import Footer from '../Footer';

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
  }, []);

  return (
    <>
      <Head>
        <title>{title} | Typer.io</title>
        <link
          rel="icon"
          href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/microsoft/209/racing-car_1f3ce.png"
        />
        <meta name="description" content={description} />
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
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  children: null,
  striped: false,
  title: 'Typer.io | Multiplayer Typing Test - Race Your Friends',
  description:
    'Online Multiplayer Typing Test - Improve your typing speed and race your friends. Practice on different texts and learn how to type faster.'
};

export default Layout;
