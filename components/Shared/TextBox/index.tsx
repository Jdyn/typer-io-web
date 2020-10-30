import styles from './index.module.css';

const TextBox = (props) => {
  const { placeholder, onClick, onChange, value, height } = props;
  return (
    <textarea
      className={styles.root}
      placeholder={placeholder}
      onClick={onClick}
      onChange={onChange}
      value={value}
      style={{ height }}
    />
  );
};

export default TextBox;
