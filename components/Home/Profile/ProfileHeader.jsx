import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

const ProfileHeader = (props) => {
  const { username, updateClient } = props;
  const [name, setName] = useState(username || '');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name !== username) {
      updateClient({ username: name });
    }
  };

  useEffect(() => {
    if (name !== username) {
      updateClient({ username: name });
    }
  }, [name, updateClient, username]);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerPortrait} />
      <form onSubmit={handleSubmit} className={styles.container}>
        <input
          className={styles.headerInput}
          type="text"
          maxLength={16}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="username"
        />
      </form>
    </div>
  );
};

export default ProfileHeader;
