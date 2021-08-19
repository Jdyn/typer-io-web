import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import styles from './index.module.css';
import { nicknameChanged } from '../../../store/session/reducers';
import { AppState } from '../../../store';
import Button from '../../Shared/Button';
import Paper from '../../Shared/Paper';
import emojiList from '../../../lib/emojis';

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

  const Row = ({
    index,
    style
  }: {
    index: number;
    style: Record<string | number, string & Record<string, unknown>>;
  }) => {
    const items = [];
    const fromIndex = index * 4;
    const toIndex = Math.min(fromIndex + 4, emojiList.length);

    for (let i = fromIndex; i < toIndex; i += 1) {
      items.push(
        <button
          type="button"
          key={emojiList[i]}
          onClick={(): void => handleEmojiPick(emojiList[i])}
          className={`${styles.emoji} ${currentEmoji === emojiList[i] ? styles.selected : ''}`}
        >
          {emojiList[i]}
        </button>
      );
    }

    return (
      <div className={styles.row} style={style}>
        {items}
      </div>
    );
  };

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
          <List
            className={styles.emojis}
            itemCount={emojiList.length / 4}
            itemSize={42}
            height={1500}
            width={195}
          >
            {Row}
          </List>
        </div>
        {requireSave && (
          <div className={styles.buttonWrapper}>
            <Button padding="8px" margin="10px" onClick={(): void => handleUpdate()}>
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

export default Profile;
