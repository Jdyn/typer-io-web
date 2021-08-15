import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { updateUser } from '../../../../store/session/actions';
import { requests } from '../../../../store/session/types';
import TextBox from '../../../Shared/TextBox';
import { AppState } from '../../../../store';
import Button from '../../../Shared/Button';
import Paper from '../../../Shared/Paper';
import styles from './index.module.css';
import { SettingsForm } from './types';
import countries from '../../../../lib/countries';

const ProfileSettingsPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state: AppState) => state.session.user);
  const updateUserRequest = useSelector((state: AppState) => state.request[requests.UPDATE_USER]);

  const [form, setForm] = useState<SettingsForm>({
    bio: sessionUser?.bio ?? '',
    country: sessionUser?.country ?? '',
    age: sessionUser?.age ?? '',
    gender: sessionUser?.gender ?? ''
  });

  useEffect(() => {
    if (sessionUser) {
      setForm((prev) => ({
        ...prev,
        bio: sessionUser.bio,
        country: sessionUser.country,
        age: sessionUser.age,
        gender: sessionUser.gender
      }));
    }
  }, [sessionUser]);

  const onClick = (event): void => {
    event.preventDefault();

    Object.keys(form).forEach((item) => {
      if (form[item] === '') {
        form[item] = null;
      }
    });

    console.log(form);
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
                <div className={styles.label}>Change Country:</div>

                <span className={styles.content}>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger className={styles.dropdown}>
                      {form.country || 'Not set'}
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content className={styles.dropdownList}>
                      <DropdownMenu.Arrow />
                      {countries.map((country) => (
                        <DropdownMenu.Item
                          key={country.text}
                          onSelect={(e): void =>
                            setForm({
                              ...form,
                              country: country.text === 'Not set' ? null : e.target.innerText
                            })
                          }
                        >
                          {country.text}
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </span>
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Change Age:</div>
                <span className={styles.content}>
                  <input
                    className={styles.input}
                    placeholder="42"
                    value={form.age}
                    onChange={(e): void => setForm({ ...form, age: e.target.value })}
                  />
                </span>
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Change Gender:</div>
                <span className={styles.content}>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger className={styles.dropdown}>
                      {form.gender || 'Not set'}
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content className={styles.dropdownList}>
                      <DropdownMenu.Arrow />
                      {['Not set', 'Male', 'Female', 'Other'].map((gender) => (
                        <DropdownMenu.Item
                          key={gender}
                          onSelect={(e): void =>
                            setForm({
                              ...form,
                              gender: gender === 'Not set' ? null : e.target.innerText
                            })
                          }
                        >
                          {gender}
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </span>
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Bio:</div>
                <span className={styles.content}>
                  <TextBox
                    value={form.bio}
                    height="200px"
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void =>
                      setForm({ ...form, bio: event.target.value })
                    }
                    placeholder="Typing is fun."
                  />
                </span>
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Change Username:</div>
                <span className={styles.content}>
                  <input
                    className={styles.input}
                    placeholder="New Username"
                    onChange={(e): void => setForm({ ...form, username: e.target.value })}
                  />
                </span>
              </div>
            </div>
            <div className={styles.save}>
              <Button padding="5px 20px" onClick={onClick}>
                save
              </Button>
              {updateUserRequest?.success && <span className={styles.success}>Saved.</span>}
              {updateUserRequest?.errored && (
                <span className={styles.error}>{updateUserRequest?.error}</span>
              )}
            </div>
          </div>
        </Paper>
      </section>
    </div>
  );
};

export default ProfileSettingsPage;
