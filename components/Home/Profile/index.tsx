import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nicknameChanged } from '../../../store/session/reducers';
import { AppState } from '../../../store';
import Button from '../../Shared/Button';
import Paper from '../../Shared/Paper';
import emojiList from '../../../lib/emojis';

import styles from './index.module.css';
import { silentEmit } from '../../../services/socket';
import Paginate from '../../Shared/Paginate';

interface Props {
  requireSave?: boolean;
}

const Profile = (props: Props): JSX.Element => {
  const { requireSave } = props;

  const nickname = useSelector((state: AppState) => state.session.nickname);
  const sessionName = useSelector((state: AppState) => state.session.user?.username);

  const dispatch = useDispatch();

  const [currentEmoji, setEmoji] = useState('');
  const [emojiPage, setEmojiPage] = useState(0);

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

  const emojis = useMemo(() => {
    const test = emojiList?.slice(emojiPage * 16, emojiPage * 16 + 16);

    return test.map((item) => (
      <button
        type="button"
        key={item}
        onClick={(): void => handleEmojiPick(item)}
        className={`${styles.emoji} ${currentEmoji === item ? styles.selected : ''}`}
      >
        {item}
      </button>
    ));
  }, [currentEmoji, emojiPage]);

  const handleUpdate = useCallback(() => {
    let username = localStorage?.getItem('nickname');

    // Necessary comparison operator
    // eslint-disable-next-line
    if (username == '' || !username) {
      username = sessionName;
    }

    silentEmit('CLIENT_SETTINGS_UPDATE', {
      emoji: currentEmoji,
      username
    });
  }, [currentEmoji, sessionName]);

  return (
    <Paper title="You">
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.portrait}>{currentEmoji}</div>
          <input
            id="nicknameInput"
            className={styles.input}
            value={nickname || ''}
            maxLength={20}
            placeholder="Enter nickname"
            onChange={didChange}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.emojis}>{emojis}</div>
          <Paginate
            defaultPage={1}
            totalPages={Math.floor(emojiList.length / 16) + 1}
            pageUpdated={(newPage) => setEmojiPage(newPage)}
          />
        </div>
        {requireSave && (
          <div className={styles.buttonWrapper}>
            <Button padding="8px" margin="10px" onClick={handleUpdate}>
              save
            </Button>
          </div>
        )}
      </div>
    </Paper>
  );
};

Profile.defaultProps = {
  requireSave: false
};

export default React.memo(Profile);
