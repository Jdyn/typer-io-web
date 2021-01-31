import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.css';
import { nicknameChanged } from '../../../store/session/reducers';
import { AppState } from '../../../store';
import Button from '../../Shared/Button';
import Paper from '../../Shared/Paper';

interface Props {
  requireSave?: boolean;
  onClick?: (object) => void | null;
}

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

const Profile = (props: Props): JSX.Element => {
  const { requireSave, onClick } = props;

  const nickname = useSelector((state: AppState) => state.session.nickname);
  const sessionName = useSelector(
    (state: AppState) => state.session.user?.username
  );

  const dispatch = useDispatch();

  const [currentEmoji, setEmoji] = useState('');

  const didChange = (event): void => {
    event.preventDefault();

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

    // Necessary comparison operator
    // eslint-disable-next-line eqeqeq
    if (username == '' || !username) {
      username = sessionName;
    }

    if (typeof onClick === 'function') {
      onClick({
        emoji: currentEmoji,
        username
      });
    }
  };

  return (
    <Paper title="Profile">
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.portrait}>{currentEmoji}</div>
            <input
              id="nicknameInput"
              className={styles.input}
              value={nickname || ''}
              maxLength={21}
              placeholder="John Smith"
              onChange={didChange}
            />
          </div>
          <div className={styles.emojis}>
            {emojiList.map((item) => (
              <button
                type="button"
                key={item}
                onClick={(): void => handleEmojiPick(item)}
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
              <Button padding="8px" onClick={(): void => handleUpdate()}>
                save
              </Button>
            </div>
          )}
        </div>
      </div>
    </Paper>
  );
};

Profile.defaultProps = {
  requireSave: false,
  onClick: null
};

export default Profile;
