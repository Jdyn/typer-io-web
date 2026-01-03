import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import countries from '../../../../lib/countries';
import {
  useLazySendValidateEmailQuery,
  useUpdateAccountMutation,
  useUploadAvatarMutation,
  useDeleteAvatarMutation
} from '../../../../services/account';
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
  const [uploadAvatar, { isLoading: isUploading, error: uploadError }] = useUploadAvatarMutation();
  const [deleteAvatar, { isLoading: isDeleting, error: deleteError }] = useDeleteAvatarMutation();

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [form, setForm] = useState<SettingsForm>({
    email: sessionUser?.email ?? '',
    bio: sessionUser?.bio ?? '',
    country: sessionUser?.country ?? '',
    age: sessionUser?.age ?? '',
    gender: sessionUser?.gender ?? '',
    goal: sessionUser?.goal?.toString()
  });

  useEffect(() => {
    if (sessionUser) {
      setForm((prev) => ({
        ...prev,
        email: sessionUser.email,
        bio: sessionUser.bio,
        country: sessionUser.country,
        age: sessionUser.age,
        gender: sessionUser.gender,
        goal: sessionUser.goal?.toString()
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
    if (!error) return null;

    const { errors } = (error as ApiErrorResponse).data;

    return (
      <>
        {Object.keys(errors).map((key) => (
          <div key={key}>{`${key} ${errors[key][0]}`}</div>
        ))}
      </>
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a JPG or PNG image');
      return;
    }

    // Validate file size (2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      alert('Image is too large. Please choose an image under 2MB');
      return;
    }

    setAvatarFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!avatarFile) return;

    const formData = new FormData();
    formData.append('avatar', avatarFile);

    try {
      await uploadAvatar(formData).unwrap();
      setAvatarFile(null);
      setAvatarPreview(null);
    } catch (err) {
      // Error handled by RTK Query and displayed in UI
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to remove your avatar?')) return;

    try {
      await deleteAvatar().unwrap();
      setAvatarPreview(null);
    } catch (err) {
      // Error handled by RTK Query and displayed in UI
    }
  };

  const handleChooseFile = () => {
    document.getElementById('avatar-upload')?.click();
  };

  return (
    <div className={styles.root}>
      <section className={styles.settings}>
        <Paper title="Account Settings">
          <div className={styles.container}>
            <div className={styles.wrapper}>
              {sessionUser?.isAdmin && (
                <div className={styles.avatarSection}>
                  <h3>Profile Avatar</h3>
                  <div className={styles.avatarContainer}>
                    <div className={styles.avatarPreview}>
                      {avatarPreview || sessionUser?.avatarUrl ? (
                        <img src={avatarPreview || sessionUser?.avatarUrl} alt="Avatar preview" />
                      ) : (
                        <div className={styles.avatarPlaceholder}>No Avatar</div>
                      )}
                    </div>

                    <div className={styles.avatarActions}>
                      <input
                        type="file"
                        id="avatar-upload"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />

                      <Button
                        padding="5px 20px"
                        onClick={handleChooseFile}
                        isPending={isUploading || isDeleting}
                      >
                        Choose File
                      </Button>

                      {avatarFile && (
                        <Button
                          padding="5px 20px"
                          onClick={handleUpload}
                          disabled={isUploading || isDeleting}
                        >
                          {isUploading ? 'Uploading...' : 'Upload'}
                        </Button>
                      )}

                      {sessionUser?.avatarUrl && !avatarFile && (
                        <Button
                          padding="5px 20px"
                          onClick={handleDelete}
                          disabled={isUploading || isDeleting}
                        >
                          {isDeleting ? 'Removing...' : 'Remove Avatar'}
                        </Button>
                      )}
                    </div>

                    {uploadError && (
                      <div className={styles.error}>
                        {(uploadError as any)?.data?.error || 'Failed to upload avatar'}
                      </div>
                    )}

                    {deleteError && <div className={styles.error}>Failed to remove avatar</div>}

                    <div className={styles.avatarInfo}>
                      <small>
                        JPG or PNG only. Max size: 2MB. Image will be resized to 256x256.
                      </small>
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.item}>
                <div className={styles.label}>Username:</div>
                <span className={styles.content}>{sessionUser?.username}</span>
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Daily Goal:</div>
                <span className={styles.content}>
                  <input
                    className={styles.input}
                    placeholder="5"
                    value={form.goal}
                    onChange={(e): void => setForm({ ...form, goal: e.target.value })}
                  />
                </span>
              </div>
              <div className={styles.item}>
                <div className={styles.label}>
                  <span>Email:</span>
                  {sessionUser?.emailVerified === false && !EmailSent ? (
                    <Button onClick={() => triggerEmail(null)}>Validate Email</Button>
                  ) : (
                    <span>(verified ✅)</span>
                  )}
                </div>
                <div className={styles.content}>
                  <input
                    className={styles.input}
                    placeholder="email"
                    value={form.email}
                    onChange={(e): void => setForm({ ...form, email: e.target.value })}
                  />
                </div>
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
