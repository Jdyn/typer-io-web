import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../../Shared/Banner';
import styles from './index.module.css';
import { nicknameChanged } from '../../../store/session/reducers';
import { AppState } from '../../../store';

const emojiList = [
  '🦍',
  '🦧',
  '💩',
  '🐀',
  '🍆',
  '⛷️',
  '🐌',
  '🐔',
  '🍌',
  '🌵',
  '🐍',
  '🦽'
];

const Profile = (): JSX.Element => {
  const nickname = useSelector((state: AppState) => state.session.nickname);
  const dispatch = useDispatch();
  const [currentEmoji, setEmoji] = useState('');
  const didChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(nicknameChanged(event.target.value));
    localStorage.setItem('nickname', event.target.value);
  };

  useEffect(() => {
    const current = localStorage?.getItem('emoji') || emojiList[3];
    setEmoji(current);
  }, []);

  const handleEmojiPick = (emoji) => {
    localStorage.setItem('emoji', emoji);
    setEmoji(emoji);
  };

  return (
    <div className={styles.root}>
      <Banner>
        <h1>Profile</h1>
      </Banner>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.portrait}>{currentEmoji}</div>
          <span>Set nickname:</span>
          <input
            className={styles.input}
            value={nickname || ''}
            placeholder="Enter Nickname"
            onChange={didChange}
          />
        </div>
        <div className={styles.emojis}>
          {emojiList.map((item, index) => (
            <button
              key={item}
              onClick={() => handleEmojiPick(item)}
              className={`${styles.emoji} ${
                currentEmoji === item ? styles.selected : ''
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
