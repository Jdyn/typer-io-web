import { stat } from 'fs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../store';
import { updateUser } from '../../../store/session/actions';
import { requests } from '../../../store/session/types';
import Button from '../../Shared/Button';
import Paper from '../../Shared/Paper';
import TextBox from '../../Shared/TextBox';
import styles from './index.module.css';

const ProfileSettings = (): JSX.Element => {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state: AppState) => state.session.user);
  const updateUserRequest = useSelector(
    (state: AppState) => state.request[requests.UPDATE_USER]
  );

  const [form, setForm] = useState({ bio: sessionUser?.bio || '' });

  useEffect(() => {
    if (sessionUser?.bio) {
      setForm((prev) => ({ ...prev, bio: sessionUser.bio }));
    }
  }, [sessionUser?.bio]);

  const onClick = (event): void => {
    event.preventDefault();

    dispatch(updateUser(form));
  };

  return (
    <div className={styles.root}>
      <section className={styles.settings}>
        <Paper title="Account Settings">
          <div className={styles.container}>
            <div className={styles.wrapper}>
              <div className={styles.item}>
                <div className={styles.label}>Username:</div>
                <span className={styles.content}>{sessionUser?.username}</span>
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Email:</div>
                <span className={styles.content}>{sessionUser?.email}</span>
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Bio:</div>
                <span className={styles.content}>
                  <TextBox
                    value={form.bio}
                    height="200px"
                    onChange={(e): void =>
                      setForm({ ...form, bio: e.target.value })
                    }
                    placeholder="Enter your bio..."
                  />
                </span>
              </div>
            </div>
            <div className={styles.save}>
              <Button padding="5px 20px" onClick={onClick}>
                save
              </Button>
              {updateUserRequest?.success && <span>Saved.</span>}
            </div>
          </div>
        </Paper>
      </section>
    </div>
  );
};

export default ProfileSettings;
