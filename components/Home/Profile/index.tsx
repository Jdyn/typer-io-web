import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../../Shared/Banner';
import styles from './index.module.css';
import { nicknameChanged } from '../../../store/session/reducers';
import { AppState } from '../../../store';

const Profile = (_props): JSX.Element => {
  const nickname = useSelector((state: AppState) => state.session.nickname);
  const dispatch = useDispatch();

  const changed = (e) => {
    dispatch(nicknameChanged(e.target.value));
    localStorage.setItem('username', e.target.value);
  };

  return (
    <div className={styles.root}>
      <Banner>
        <h1>Profile</h1>
      </Banner>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.portrait} />
          <span>Set your name to be seen!</span>
          <input
            className={styles.input}
            value={nickname || ''}
            placeholder="enter nickname"
            onChange={changed}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
