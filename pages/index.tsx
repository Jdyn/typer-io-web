import Link from 'next/link';

import Adsense from 'components/Shared/Adsense';
import Paper from 'components/Shared/Paper';
import Hiscores from 'app/Home/Hiscores';
import Profile from 'app/Home/Profile';
import RecentMatches from 'app/Home/RecentMatches';
import RecentPosts from 'app/Home/RecentPosts';
import formatTime from 'util/formatTime';
import View from 'components/Shared/View';
import Meta from 'components/Shared/Meta';

import styles from 'styles/Home.module.css';

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

const updated = formatTime(1646447619446);

function HomePage(): JSX.Element {
  return (
    <main className={styles.root}>
      <Meta
        title="Home | Fast multiplayer typing races with your friends"
        description="Typer is a fast and modern multiplayer typing competition. Type against your friends in large 50+ player matches in a few clicks."
      />
      <section className={styles.left}>
        <Paper title="News">
          <View>
            <div className={styles.news}>
              <h2>Improve your typing speed and race your friends!</h2>
              <span>updated {updated} </span>
              <p>
                Hello, welcome to Typer. thank you for visiting. Join the Discord to request larger
                lobbies.
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
              <ul className={styles.list}>
                <h3>Recent Changes:</h3>
                <li>Added records to user profiles</li>
                <li>Updated hiscores interface</li>
              </ul>
            </div>
          </View>
        </Paper>
        <Adsense client="ca-pub-3148839588626786" slot="7924266447" />
      </section>
      <section className={styles.center}>
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
      <section className={styles.right}>
        <RecentPosts />
        <Adsense client="ca-pub-3148839588626786" slot="8439040257" />
        <RecentMatches />
        <Adsense client="ca-pub-3148839588626786" slot="7114370741" />
      </section>
      <Adsense className={styles.lower} client="ca-pub-3148839588626786" slot="7924266447" />
    </main>
  );
}

export default HomePage;
