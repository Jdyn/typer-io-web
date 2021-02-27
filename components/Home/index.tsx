import Link from 'next/link';
import Adsense from '../Shared/Adsense';
import styles from './index.module.css';
import Paper from '../Shared/Paper';
import Hiscores from './Hiscores';
import formatTime from '../../util/formatTime';
import RecentPosts from './RecentPosts';
import Profile from './Profile';
import RecentMatches from './RecentMatches';

const cards = [
  {
    title: 'Quick Play',
    text: 'Play against others',
    color: 'blue',
    route: '/play'
  },
  {
    title: 'Solo Play',
    text: 'Play on your own',
    color: 'green',
    route: '/solo'
  },
  {
    title: 'Group Play',
    text: 'Play against friends',
    color: 'pink',
    route: '/lobby'
  }
];

const Home = (): JSX.Element => {
  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <section className={styles.news}>
          <section
            className={styles.aContainer}
            style={{
              maxHeight: '300px',
              gridArea: 'content'
            }}
          >
            <Adsense
              client="ca-pub-3148839588626786"
              slot="8439040257"
              wrapperStyles={{ marginBottom: '20px' }}
              style={{
                display: 'block',
                textAlign: 'center'
              }}
              format="fluid"
              layout="in-article"
            />
          </section>
          <Paper title="News">
            <div className={styles.newsContainer}>
              <div className={styles.newsWrapper}>
                <h2>Improve your typing speed and race your friends!</h2>
                <span>updated {formatTime(1614394109182)} </span>
                <p>
                  Hello, thank you for using my site. if you have any
                  suggestions, please let me know on the forums!
                </p>
                <a
                  className={styles.support}
                  href="https://www.buymeacoffee.com/typer"
                  target="_blank"
                  rel="noreferrer"
                >
                  support the creator ➜
                </a>
                <h3>Changes (Feb. 18th, 2021):</h3>
                <div className={styles.list}>
                  <ul>
                    <li>
                      You can now start a new game quickly after you finish in
                      solo and quick play.
                    </li>
                    <li>
                      Smoothed out the moving animaton of Game Pieces on the
                      text.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Paper>
          <section
            className={styles.aContainer}
            style={{
              maxHeight: '800px',
              margin: '20px auto'
            }}
          >
            <Adsense
              client="ca-pub-3148839588626786"
              slot="7924266447"
              style={{ display: 'block', textAlign: 'center' }}
              format="fluid"
              layout="in-article"
            />
          </section>
        </section>
        <section className={styles.hub}>
          <Profile />
          <div className={styles.menu}>
            {cards.map((card) => {
              return (
                <Link prefetch={false} href={card.route} key={card.route}>
                  <a
                    type="button"
                    className={`${styles.card} ${styles[card.color]}`}
                    key={card.route}
                  >
                    <h3>{card.title} ➜</h3>
                    <p>{card.text}</p>
                  </a>
                </Link>
              );
            })}
          </div>
        </section>
        <Hiscores />
        <RecentPosts />
        <RecentMatches />
      </div>
      <section
        className={styles.aContainer}
        style={{
          maxHeight: '200px',
          maxWidth: '780px',
          margin: '0 auto',
          padding: '0px 10px'
        }}
      >
        <Adsense
          client="ca-pub-3148839588626786"
          slot="7924266447"
          style={{ display: 'block', textAlign: 'center' }}
          format="fluid"
          layout="in-article"
        />
      </section>
    </main>
  );
};

export default Home;
