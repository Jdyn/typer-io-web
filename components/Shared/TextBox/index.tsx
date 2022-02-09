import styles from './index.module.css';

interface TextBoxProps {
  id?: string;
  disabled?: boolean;
  maxLength?: number;
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
  id: null,
  maxLength: null
};

export default TextBox;
