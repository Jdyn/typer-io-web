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

const updated = formatTime(1630811164560);

const HomePage = (): JSX.Element => {
  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <section className={styles.centerColumn}>
          <Profile />
          <div className={styles.menu}>
            {cards.map((card) => {
              return (
                <Link prefetch={false} href={card.route} key={card.route}>
                  <a className={`${styles.card} ${styles[card.color]}`} key={card.route}>
                    {`${card.title} ➜`} <span>{card.text}</span>
                  </a>
                </Link>
              );
            })}
          </div>
          <Hiscores />
        </section>
        <section className={styles.leftColumn}>
          <Paper title="News">
            <div className={styles.newsContainer}>
              <div className={styles.newsWrapper}>
                <h2>Improve your typing speed and race your friends!</h2>
                <span>updated {updated} </span>
                <p>
                  Note: If you want to have a very large match, let me know on discord below,
                  otherwise servers may not handle it!
                </p>
                <a
                  className={styles.support}
                  href="https://discord.gg/E2Fj4h3JCa"
                  target="_blank"
                  rel="noreferrer"
                >
                  Join the Discord ➜
                </a>
                <a
                  className={styles.support}
                  href="https://www.buymeacoffee.com/typer"
                  target="_blank"
                  rel="noreferrer"
                >
                  Support the Creator ➜
                </a>
                <h3>Changes (September 4th, 2021):</h3>
                <div className={styles.list}>
                  <ul>
                    <li>Added per quote difficulty top matches to leaderboards</li>
                    <li>Performance improvements</li>
                  </ul>
                </div>
              </div>
            </div>
          </Paper>
          <section>
            <Adsense
              client="ca-pub-3148839588626786"
              slot="7924266447"
              style={{ display: 'block', textAlign: 'center' }}
              format="fluid"
              layout="in-article"
            />
          </section>
        </section>
        <section className={styles.rightColumn}>
          <RecentPosts />
          <Adsense
            client="ca-pub-3148839588626786"
            slot="8439040257"
            style={{ display: 'block', textAlign: 'center' }}
            format="fluid"
            layout="in-article"
          />
          <RecentMatches />
          <Adsense
            client="ca-pub-3148839588626786"
            slot="7114370741"
            style={{ display: 'block', textAlign: 'center' }}
            format="fluid"
            layout="in-article"
          />
        </section>
      </div>
      <section
        style={{
          maxWidth: '780px',
          margin: '20px auto',
          padding: '0px 10px'
        }}
      >
        <Adsense
          client="ca-pub-3148839588626786"
          slot="7924266447"
          style={{ display: 'block', width: '100%' }}
          format="fluid"
          layout="in-article"
        />
      </section>
    </main>
  );
};

export default HomePage;
