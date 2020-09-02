import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../../Shared/Banner';
import styles from './index.module.css';
import { nicknameChanged } from '../../../store/session/reducers';
import { AppState } from '../../../store';

const Profile = (): JSX.Element => {
  const nickname = useSelector((state: AppState) => state.session.nickname);
  const dispatch = useDispatch();

  const didChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(nicknameChanged(event.target.value));
    localStorage.setItem('username', event.target.value);
  };

  return (
    <div className={styles.root}>
      <Banner>
        <h1>Profile</h1>
      </Banner>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.portrait} />
          <span>Set nickname:</span>
          <input
            className={styles.input}
            value={nickname || ''}
            placeholder="Enter Nickname"
            onChange={didChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
