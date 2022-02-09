import React from 'react';

import styles from './index.module.css';

interface TextBoxProps {
  id?: string;
  disabled?: boolean;
  maxLength?: number;
  value?: string;
  placeholder?: string;
  onClick?: (event?: React.MouseEvent<HTMLTextAreaElement>) => void;
  onChange?: (event?: React.ChangeEvent<HTMLTextAreaElement>) => void;
  height?: string;
}

const TextBox = (props: TextBoxProps): JSX.Element => {
  const { id, placeholder, onClick, onChange, value, height, disabled, maxLength } = props;

  return (
    <textarea
      id={id}
      className={styles.root}
      placeholder={placeholder}
      onClick={onClick}
      onChange={onChange}
      disabled={disabled}
      value={value}
      maxLength={maxLength}
      style={{ height }}
    />
  );
};

TextBox.defaultProps = {
  disabled: false,
  placeholder: null,
  onClick: null,
  onChange: null,
  value: null,
  id: null,
  height: '75px',
  maxLength: null
};

export default TextBox;
