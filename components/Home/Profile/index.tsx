import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../../Shared/Banner';
import styles from './index.module.css';
import { nicknameChanged } from '../../../store/session/reducers';
import { AppState } from '../../../store';
import Button from '../../Shared/Button';

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

const Profile = (props): JSX.Element => {
  const { requireSave, onClick } = props;

  const nickname = useSelector((state: AppState) => state.session.nickname);
  const sessionName = useSelector(
    (state: AppState) => state.session.user?.username
  );

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

  const handleUpdate = () => {
    let username = localStorage?.getItem('nickname');

    if (username == '' || !username) {
      username = sessionName;
    }

    onClick({
      emoji: currentEmoji,
      username
    });
  };

  return (
    <div className={styles.root}>
      <Banner>
        <h1>Profile</h1>
      </Banner>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.portrait}>{currentEmoji}</div>
          <input
            className={styles.input}
            value={nickname || ''}
            placeholder="Enter Nickname"
            onChange={didChange}
          />
        </div>
        <div className={styles.emojis}>
          {emojiList.map((item) => (
            <button
              type="button"
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
        {requireSave && (
          <div className={styles.buttonWrapper}>
            <Button padding="8px" onClick={() => handleUpdate()}>
              save
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
