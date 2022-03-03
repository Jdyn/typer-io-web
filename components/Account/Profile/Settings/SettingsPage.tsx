import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import countries from '../../../../lib/countries';
import { useLazySendValidateEmailQuery, useUpdateAccountMutation } from '../../../../services/account';
import { ApiErrorResponse } from '../../../../services/types';
import { AppState } from '../../../../store';
import Button from '../../../Shared/Button';
import Paper from '../../../Shared/Paper';
import TextBox from '../../../Shared/TextBox';
import styles from './index.module.css';
import { SettingsForm } from './types';

const ProfileSettingsPage = (): JSX.Element => {
  const sessionUser = useSelector((state: AppState) => state.session.user) || null;
  const [updateAccount, { isSuccess, isError, error }] = useUpdateAccountMutation();
  const [triggerEmail, { isSuccess: EmailSent }] = useLazySendValidateEmailQuery();

  const [form, setForm] = useState<SettingsForm>({
    email: sessionUser?.email ?? '',
    bio: sessionUser?.bio ?? '',
    country: sessionUser?.country ?? '',
    age: sessionUser?.age ?? '',
    gender: sessionUser?.gender ?? ''
  });

  useEffect(() => {
    if (sessionUser) {
      setForm((prev) => ({
        ...prev,
        email: sessionUser.email,
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

    updateAccount(form);
  };

  const parseErrors = () => {
    const { errors } = (error as ApiErrorResponse).data;
    return (
      <>
        {Object.keys(errors).map((key) => (
          <div key={key}>{`${key} ${errors[key][0]}`}</div>
        ))}
      </>
    );
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
                <div className={styles.content}>
                  <input
                    className={styles.input}
                    placeholder="email"
                    value={form.email}
                    onChange={(e): void => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                {sessionUser?.emailVerified === false && !EmailSent ? (
                  <Button onClick={() => triggerEmail(null)}>Validate Email</Button>
                ) : (
                  <div>Your email is verified ✅</div>
                )}
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Country:</div>
                <div className={styles.content}>
                  <DropdownMenu>
                    <DropdownMenuTrigger className={styles.dropdown}>
                      {form.country || 'Not set'}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={styles.dropdownList}>
                      {countries.map((country) => (
                        <DropdownMenuItem
                          key={country.text}
                          onSelect={(e: any): void =>
                            setForm({
                              ...form,
                              country: country.text === 'Not set' ? null : e.target.innerText
                            })
                          }
                        >
                          {country.text}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Age:</div>
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
                <div className={styles.label}>Gender:</div>
                <span className={styles.content}>
                  <DropdownMenu>
                    <DropdownMenuTrigger className={styles.dropdown}>
                      {form.gender || 'Not set'}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={styles.dropdownList}>
                      {['Not set', 'Male', 'Female', 'Other'].map((gender) => (
                        <DropdownMenuItem
                          key={gender}
                          onSelect={(e: any): void =>
                            setForm({
                              ...form,
                              gender: gender === 'Not set' ? null : e.target.innerText
                            })
                          }
                        >
                          {gender}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
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
            </div>
            <div className={styles.save}>
              <Button padding="5px 20px" onClick={onClick}>
                save
              </Button>
              {isSuccess && <span className={styles.success}>Saved.</span>}
              {isError && <span className={styles.error}>{parseErrors()}</span>}
            </div>
          </div>
        </Paper>
      </section>
    </div>
  );
};

export default ProfileSettingsPage;
