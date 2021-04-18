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
      <section className={styles.leftColumn}>
        <section style={{ maxHeight: '800px' }}>
          <Adsense
            client="ca-pub-3148839588626786"
            slot="7114370741"
            style={{ display: 'block', textAlign: 'center' }}
            format="fluid"
            layout="in-article"
          />
        </section>
        <Paper title="News">
          <div className={styles.newsContainer}>
            <div className={styles.newsWrapper}>
              <h2>Improve your typing speed and race your friends!</h2>
              <span>updated {formatTime(1618778351949)} </span>
              <p>
                Hello, thank you for using my site. if you have any suggestions,
                please let me know on the forums!
              </p>
              <a
                className={styles.support}
                href="https://www.buymeacoffee.com/typer"
                target="_blank"
                rel="noreferrer"
              >
                support the creator ➜
              </a>
              <h3>Changes (April 18th, 2021):</h3>
              <div className={styles.list}>
                <ul>
                  <li>
                    The daily hiscores on the homepage refresh instantly now.
                    You no longer need to refresh the page.
                  </li>
                  <li>
                    You can now change your username in your profile settings.
                  </li>
                  <li>
                    Custom lobbies can now go up to 60 players, up from 30.
                  </li>
                  <li>I have finally added dark mode.</li>
                </ul>
              </div>
            </div>
          </div>
        </Paper>
        <section style={{ maxHeight: '800px' }}>
          <Adsense
            client="ca-pub-3148839588626786"
            slot="7924266447"
            style={{ display: 'block', textAlign: 'center' }}
            format="fluid"
            layout="in-article"
          />
        </section>
      </section>
      <section className={styles.centerColumn}>
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
        <Hiscores />
      </section>
      <section className={styles.rightColumn}>
        <RecentPosts />
        <section style={{ maxHeight: '300px' }}>
          <Adsense
            client="ca-pub-3148839588626786"
            slot="8439040257"
            style={{ display: 'block', textAlign: 'center' }}
            format="fluid"
            layout="in-article"
          />
        </section>
        <RecentMatches />
      </section>
      <section
        className={styles.ad}
        style={{
          maxHeight: '200px',
          maxWidth: '780px',
          margin: '0 auto',
          gridArea: 'ad'
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
