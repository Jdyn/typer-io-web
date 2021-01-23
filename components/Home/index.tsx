import Link from 'next/link';
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
    color: '#6772e5',
    route: '/play'
  },
  {
    title: 'Solo Play',
    text: 'Play on your own',
    color: '#3ECF8E',
    route: '/solo'
  },
  {
    title: 'Group Play',
    text: 'Play against friends',
    color: '#DC6AC8',
    route: '/lobby'
  }
];

const Home = (): JSX.Element => {
  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <section className={styles.news}>
          <Paper title="News">
            <div className={styles.newsContainer}>
              <div className={styles.newsWrapper}>
                <h2>Improve your typing speed and race your friends!</h2>
                <span>updated {formatTime(1611341617300)} </span>
                <p>
                  Hello, the site has been gaining a lot of traction lately
                  which has increased costs significantly. Please consider
                  supporting development with as a little as $1 if you enjoyed
                  your time here!
                </p>
                <a
                  className={styles.support}
                  href="https://www.buymeacoffee.com/typer"
                  target="_blank"
                  rel="noreferrer"
                >
                  support the creator ➜
                </a>
                <h3>Changes (Jan. 20th, 2021):</h3>
                <div className={styles.list}>
                  <ul>
                    <li>
                      I have added an experimental custom typing
                      &quot;caret&quot; that hopefully improves the typing
                      experience
                    </li>
                    <li>
                      You can now select the difficulty in custom lobbies.
                    </li>
                    <li>
                      You can now change your name and emoji in custom lobbies.
                    </li>
                    <li>
                      You can now quickly start a new game in custom lobbies.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Paper>
        </section>

        <section className={styles.hub}>
          <Profile />
          <div className={styles.menu}>
            {cards.map((card) => {
              return (
                <Link prefetch={false} href={card.route} key={card.route}>
                  <a
                    type="button"
                    className={styles.card}
                    key={card.route}
                    style={{ background: card.color }}
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
    </main>
  );
};

export default Home;
