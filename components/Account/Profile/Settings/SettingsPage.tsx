import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../../store/session/actions';
import { requests } from '../../../../store/session/types';
import TextBox from '../../../Shared/TextBox';
import { AppState } from '../../../../store';
import Button from '../../../Shared/Button';
import Paper from '../../../Shared/Paper';
import styles from './index.module.css';
import { SettingsForm } from './types';

const ProfileSettingsPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state: AppState) => state.session.user);
  const updateUserRequest = useSelector(
    (state: AppState) => state.request[requests.UPDATE_USER]
  );

  const [form, setForm] = useState<SettingsForm>({
    bio: sessionUser?.bio ?? '',
    username: ''
  });

  useEffect(() => {
    if (sessionUser) {
      setForm((prev) => ({ ...prev, bio: sessionUser.bio }));
    }
  }, [sessionUser]);

  const onClick = (): void => {
    if (form.username === '') {
      delete form.username;
    }

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
                    onChange={(
                      event: React.ChangeEvent<HTMLTextAreaElement>
                    ): void => setForm({ ...form, bio: event.target.value })}
                    placeholder="Enter your bio..."
                  />
                </span>
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Change Username:</div>
                <span className={styles.content}>
                  <input
                    className={styles.input}
                    placeholder="New Username"
                    onChange={(e): void =>
                      setForm({ ...form, username: e.target.value })
                    }
                  />
                </span>
              </div>
            </div>
            <div className={styles.save}>
              <Button padding="5px 20px" onClick={onClick}>
                save
              </Button>
              {updateUserRequest?.success && <span>Saved.</span>}
              {updateUserRequest?.errored && (
                <span>{updateUserRequest?.error}</span>
              )}
            </div>
          </div>
        </Paper>
      </section>
    </div>
  );
};

export default ProfileSettingsPage;