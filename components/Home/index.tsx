import Link from 'next/link';
import styles from './index.module.css';
import Banner from '../Shared/Banner';
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
          <Banner>
            <h1>News</h1>
          </Banner>
          <div className={styles.newsContainer}>
            <div className={styles.newsWrapper}>
              <h2>Improve your typing speed and race your friends!</h2>
              <span>updated {formatTime(1605119973596)} </span>
              <p>
                Notice: It may take a short time to connect initially but the
                service is online.
              </p>
              <h3>Latest Updates (11/11/20):</h3>
              <div className={styles.list}>
                <ul>
                  <li>
                    You can now continue playing with your friends without
                    having to create a new lobby.
                  </li>
                  <li>
                    Custom lobbies have been reworked behind the scenes to
                    hopefully make them more customizable
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.hub}>
          <Profile />
          <div className={styles.menu}>
            {cards.map((card) => {
              return (
                <Link href={card.route} key={card.route}>
                  <a
                    type="button"
                    className={styles.card}
                    key={card.route}
                    style={{ background: card.color }}
                  >
                    <h3>{card.title}</h3>
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
