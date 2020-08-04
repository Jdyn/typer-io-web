import React, { useMemo } from 'react';
import cookie from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../../Shared/Banner';
import styles from './index.module.css';
import { nicknameChanged } from '../../../store/session/reducers';
import { AppState } from '../../../store';

const Profile = (_props): JSX.Element => {
  const nickname = useSelector((state: AppState) => state.session.nickname);
  const dispatch = useDispatch();

  const isLoggedIn = useMemo(() => cookie.get('token'), []);

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
          <span>Set a nickname below</span>
          <input
            className={styles.input}
            value={nickname || ''}
            placeholder="Enter Nickname"
            onChange={changed}
          />
          {!isLoggedIn && (
            <span>
              Hey! Create an account to be verified and save your matches. You will also gain access
              to the forums and future features.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
