/* eslint-disable react/jsx-props-no-spreading */
import { ReactNode, forwardRef } from 'react';
import styles from './index.module.css';
import Loader from '../Loader';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  secondary?: boolean;
  margin?: string;
  width?: string;
  padding?: string;
  large?: boolean;
  isPending?: boolean;
  color?: string;
  id?: string;
}

const Button = forwardRef((props: Props, ref: React.Ref<HTMLButtonElement>): JSX.Element => {
  const {
    children,
    secondary,
    onClick,
    margin,
    padding,
    isPending,
    width,
    color,
    large,
    disabled,
    ...rest
  } = props;

  return (
    <button
      type="submit"
      ref={ref}
      onClick={onClick}
      disabled={isPending || disabled}
      className={`
        ${styles.button}
        ${secondary ? styles.secondary : styles.primary}
        ${large ? styles.large : ''}`}
      style={{ margin, padding, width }}
      {...rest}
    >
      {isPending ? <Loader width="20px" height="20px" color={color} /> : children}
    </button>
  );
});

Button.defaultProps = {
  margin: '0px',
  width: 'auto',
  padding: '0px 0',
  secondary: false,
  large: false,
  onClick: () => {},
  isPending: false,
  id: null
};

export default Button;
