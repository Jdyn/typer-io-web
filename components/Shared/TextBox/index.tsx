import React from 'react';
import styles from './index.module.css';

const TextBox = (props) => {
  const { placeholder, onClick, onChange, value } = props;
  return (
    <textarea
      className={styles.root}
      placeholder={placeholder}
      onClick={onClick}
      onChange={onChange}
      value={value}
    />
  );
};

export default TextBox;
