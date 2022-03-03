import Link from 'next/link';

import formatTime from '../../util/formatTime';
import Adsense from '../Shared/Adsense';
import Paper from '../Shared/Paper';
import Hiscores from './Hiscores';
import Profile from './Profile';
import RecentMatches from './RecentMatches';
import RecentPosts from './RecentPosts';

import styles from './index.module.css';

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

const updated = formatTime(1646260354061);

const HomePage = (): JSX.Element => {
  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <section className={styles.centerColumn}>
          <Profile />
          <div className={styles.menu}>
            {cards.map((card) => (
              <Link prefetch={false} href={card.route} key={card.route}>
                <a className={`${styles.card} ${styles[card.color]}`} key={card.route}>
                  {`${card.title} ➜`} <span>{card.text}</span>
                </a>
              </Link>
            ))}
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
                  Hello, thank you for visiting the website. Join the Discord to arrange very large
                  lobbies!
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
                <h3>(Mar. 2nd, 2022) Updates :</h3>
                <div className={styles.list}>
                  <ul>
                    <li>Updated hiscores interface</li>
                    <li>improved custom quote UI</li>
                    <li>Added email validation</li>
                    <li>You can now use custom text in private lobbies</li>
                  </ul>
                </div>
              </div>
            </div>
          </Paper>
          <Adsense client="ca-pub-3148839588626786" slot="7924266447" />
        </section>
        <section className={styles.rightColumn}>
          <RecentPosts />
          <Adsense client="ca-pub-3148839588626786" slot="8439040257" />
          <RecentMatches />
          <Adsense client="ca-pub-3148839588626786" slot="7114370741" />
        </section>
      </div>
      <Adsense className={styles.lower} client="ca-pub-3148839588626786" slot="7924266447" />
    </main>
  );
};

export default HomePage;
