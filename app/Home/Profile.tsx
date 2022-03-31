import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { nicknameChanged } from 'store/session/reducers';
import { useAppSelector } from 'store';
import Button from 'components/Shared/Button';
import Paper from 'components/Shared/Paper';
import emojiList from 'lib/emojis';
import { silentEmit } from 'services/socket';
import View from 'components/Shared/View';

import styles from './Profile.module.css';

interface Props {
  requireSave?: boolean;
}

const Profile = (props: Props): JSX.Element => {
  const { requireSave } = props;

  const name = useAppSelector(({ session }) => session?.nickname || session?.user?.username);

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

  const handlePage = (page) => {
    const totalPages = Math.floor(emojiList.length / 16);
    if (page <= totalPages && page >= 0 && page !== emojiPage) {
      setEmojiPage(page);
    }
  };

  const handleUpdate = useCallback(() => {
    silentEmit('CLIENT_SETTINGS_UPDATE', {
      emoji: currentEmoji,
      nickname: name
    });
  }, [currentEmoji, name]);

  return (
    <Paper title="You">
      <View>
        <div className={styles.header}>
          <div className={styles.portrait}>{currentEmoji}</div>
          <input
            id="nicknameInput"
            className={styles.input}
            value={name || ''}
            maxLength={20}
            placeholder="Enter nickname"
            onChange={didChange}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.emojis}>{emojis}</div>
          <div className={styles.pagination}>
            <button className={styles.pageButton} onClick={() => setEmojiPage(0)} type="button">
              1
            </button>
            <button
              className={styles.pageButton}
              onClick={() => handlePage(emojiPage - 1)}
              type="button"
            >{`<`}</button>
            <span>{emojiPage + 1}</span>
            <button
              className={styles.pageButton}
              onClick={() => handlePage(emojiPage + 1)}
              type="button"
            >{`>`}</button>
            <button
              className={styles.pageButton}
              onClick={() => handlePage(Math.floor(emojiList.length / 16))}
              type="button"
            >
              {Math.floor(emojiList.length / 16) + 1}
            </button>
          </div>
        </div>
        {requireSave && (
          <div className={styles.buttonWrapper}>
            <Button padding="8px" margin="10px" onClick={handleUpdate}>
              save
            </Button>
          </div>
        )}
      </View>
    </Paper>
  );
};

Profile.defaultProps = {
  requireSave: false
};

export default React.memo(Profile);
