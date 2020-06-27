import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../../Shared/Banner';
import styles from './index.module.css';
import { nicknameChanged } from '../../../store/session/reducers';
import { AppState } from '../../../store';
import { handleAuth } from '../../../store/session/actions';

const Profile = (_props): JSX.Element => {
  const session = useSelector((state: AppState) => state.session);

  const [name, setName] = useState(session.user?.username ?? session.nickname ?? '');
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(nicknameChanged(name));
    };
  }, [dispatch, name]);

  useEffect(() => {
    if (session?.user?.username) {
      dispatch(nicknameChanged(session?.user?.username));
    }
  }, [dispatch, session]);

  // useEffect(() => {
  //   dispatch(handleAuth('login', { username: 'Jdyn', password: 'password' }));
  // }, [dispatch]);

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
