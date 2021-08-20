import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nicknameChanged } from '../../../store/session/reducers';
import { AppState } from '../../../store';
import Button from '../../Shared/Button';
import Paper from '../../Shared/Paper';
import emojiList from '../../../lib/emojis';

import styles from './index.module.css';
import { silentEmit } from '../../../services/socket';

interface Props {
  requireSave?: boolean;
  onClick?: (object) => void | null;
}

const Profile = (props: Props): JSX.Element => {
  const { requireSave, onClick } = props;

  const nickname = useSelector((state: AppState) => state.session.nickname);
  const sessionName = useSelector((state: AppState) => state.session.user?.username);

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

  const handleUserUpdate = (payload) => {
    silentEmit('CLIENT_SETTINGS_UPDATE', payload);
  };

  const emojis = useMemo(
    () =>
      emojiList.map((item) => (
        <button
          type="button"
          key={item}
          onClick={(): void => handleEmojiPick(item)}
          className={`${styles.emoji} ${currentEmoji === item ? styles.selected : ''}`}
        >
          {item}
        </button>
      )),
    [currentEmoji]
  );

  const handleUpdate = useCallback(() => {
    let username = localStorage?.getItem('nickname');

    // Necessary comparison operator
    // eslint-disable-next-line
    if (username == '' || !username) {
      username = sessionName;
    }

    if (typeof onClick === 'function') {
      onClick({
        emoji: currentEmoji,
        username
      });
    }
  }, [currentEmoji, onClick, sessionName]);

  return (
    <Paper title="You">
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.portrait}>{currentEmoji}</div>
          <input
            id="nicknameInput"
            className={styles.input}
            value={nickname || ''}
            maxLength={21}
            placeholder="Enter nickname"
            onChange={didChange}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.emojis}>{emojis}</div>
        </div>
        {requireSave && (
          <div className={styles.buttonWrapper}>
            <Button padding="8px" margin="10px" onClick={handleUserUpdate}>
              save
            </Button>
          </div>
        )}
      </div>
    </Paper>
  );
};

Profile.defaultProps = {
  requireSave: false,
  onClick: null
};

export default React.memo(Profile);
