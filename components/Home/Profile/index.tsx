import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../../Shared/Banner';
import styles from './index.module.css';
import { nicknameChanged } from '../../../store/session/reducers';
import { AppState } from '../../../store';
import { handleAuth } from '../../../store/session/actions';

const Profile = (_props): JSX.Element => {
  const session = useSelector((state: AppState) => state.session);

  const [name, setName] = useState(session.nickname ?? session.user?.username ?? null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (session.user?.username) {
  //     setName(session.user?.username);
  //   }
  // }, [session.user]);

  useEffect(() => {
    if (name !== session.user?.username && name !== session.nickname && name !== null) {
      dispatch(nicknameChanged(name));
    }
  }, [dispatch, name, session.nickname, session.user]);

  return (
    <div className={styles.root}>
      <Banner>
        <h1>Profile</h1>
      </Banner>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.portrait} />
          <input
            className={styles.input}
            placeholder="enter nickname here"
            value={name}
            onChange={(e): void => setName(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
