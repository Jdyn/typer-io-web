import { ReactNode, forwardRef, RefObject, MouseEvent } from 'react';
import Link from 'next/link';
import styles from './index.module.css';
import Loader from '../Loader';

interface Props {
  children?: ReactNode;
  onClick?: (event: MouseEvent) => void;
  secondary?: boolean;
  margin?: string;
  green?: boolean;
  grey?: boolean;
  width?: string;
  maxWidth?: string;
  padding?: string;
  isPending?: boolean;
  large?: boolean;
  href?: string;
  color?: string;
}

const Button = forwardRef(
  (props: Props, ref: RefObject<HTMLButtonElement>): JSX.Element => {
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
      href,
      green,
      grey
    } = props;

    return href ? (
      <Link href={href}>
        <button
          type="submit"
          ref={ref}
          onClick={onClick}
          disabled={isPending || false}
          className={`
        ${styles.button}
        ${secondary ? styles.secondary : styles.primary}
        ${large ? styles.large : ''}
        ${green ? styles.green : ''}`}
          style={{ margin, padding, width }}
        >
          {isPending ? (
            <Loader width="36px" height="36px" color={color} />
          ) : (
            children
          )}
        </button>
      </Link>
    ) : (
      <button
        type="submit"
        ref={ref}
        onClick={onClick}
        disabled={isPending || false}
        className={`
        ${styles.button}
        ${secondary ? styles.secondary : styles.primary}
        ${large ? styles.large : ''}
        ${green ? styles.green : ''}`}
        style={{ margin, padding, width }}
      >
        {isPending ? (
          <Loader width="20px" height="20px" color={color} />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.defaultProps = {
  margin: '5px',
  width: 'auto',
  padding: '0px 0',
  secondary: false,
  onClick: null,
  large: false
};

export default Button;
