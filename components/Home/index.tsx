import React from 'react';
import styles from './index.module.css';
import Banner from '../Shared/Banner';
import Hiscores from './Hiscores';
import formatTime from '../../util/formatTime';

interface Props {
  children?: React.ReactNode;
}

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
              <h2>Race Your Friends!</h2>
              <span>updated {formatTime(1592249062431)} </span>
              <p>
                This is a realtime typing game where you can race other players. It may take around
                25 seconds when connecting to the server for the first time. Thank you for playing.
              </p>
              <h3>WIP features:</h3>
              <div className={styles.list}>
                <ul>
                  <li>Recent high scores</li>
                  <li>Individual Match History</li>
                </ul>
              </div>
              <h3>Latest Updates:</h3>
              <div className={styles.list}>
                <ul>
                  <li>Enabled group play</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.hub}>
          <div className={styles.profile}>
            <Banner>
              <h1>Profile</h1>
            </Banner>
          </div>
          <div className={styles.menu}>
            {cards.map((card) => {
              return (
                <button
                  type="button"
                  className={styles.card}
                  key={card.route}
                  style={{ background: card.color }}
                >
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </button>
              );
            })}
          </div>
        </section>
        <section className={styles.posts}>
          <Banner>
            <h1>Recent Posts</h1>
          </Banner>
        </section>
        <Hiscores />
      </div>
    </main>
  );
};

export default Home;
