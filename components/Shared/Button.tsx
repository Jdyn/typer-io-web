import { ReactNode, forwardRef, RefObject, MouseEvent } from 'react';
import Link from 'next/link';
import Loader from './Loader';

interface Props {
  children?: ReactNode;
  onClick?: (event: MouseEvent) => void;
  secondary?: boolean;
  isPending?: boolean;
  href?: string;
  color?: string;
}

const Button = forwardRef(
  (props: Props, ref: RefObject<HTMLButtonElement>): JSX.Element => {
    const { children, secondary, onClick, isPending, color, href } = props;

    return href ? (
      <Link href={href}>
        <button
          type="submit"
          ref={ref}
          onClick={onClick}
          disabled={isPending || false}
          className={`flex flex-1 justify-center uppercase font-bold outline-none focus:outline-none text-sm border-2 p-2.5 rounded-lg transition duration-100 transform hover:-translate-y-0.5 active:translate-y-0.5 ${
            secondary
              ? 'bg-primary-light dark:bg-primary-dark dark:border-gray-600 border-gray-300 dark:text-white'
              : 'text-white bg-accent border-accentBorder'
          }
          `}
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
        className={`flex flex-1 justify-center uppercase font-bold outline-none focus:outline-none text-sm border-2 p-2.5 rounded-lg transition duration-100 transform hover:-translate-y-0.5 active:translate-y-0.5 ${
          secondary
            ? 'bg-primary-light dark:bg-primary-dark dark:border-gray-600 border-gray-300 dark:text-white'
            : 'text-white bg-accent border-accentBorder'
        }
        `}
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
  secondary: false,
  onClick: null,
  isPending: false,
  children: null,
  color: 'white',
  href: ''
};

export default Button;
