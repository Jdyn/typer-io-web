import styles from './index.module.css';

interface Props {
  width?: string;
  height?: string;
  color?: string;
}

const Loader = (props: Props): JSX.Element => {
  const { width, height, color } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      className={styles.loader}
      height={height}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        r="32"
        strokeWidth="8"
        stroke={color}
        strokeDasharray="50.26548245743669 50.26548245743669"
        fill="none"
        strokeLinecap="round"
        transform="rotate(172.687 50 50)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="6.666666666666666s"
          repeatCount="indefinite"
          keyTimes="0;1"
          values="0 50 50;360 50 50"
        />
      </circle>
      <circle
        cx="50"
        cy="50"
        r="23"
        strokeWidth="8"
        stroke={color}
        strokeDasharray="36.12831551628262 36.12831551628262"
        strokeDashoffset="36.12831551628262"
        fill="none"
        strokeLinecap="round"
        transform="rotate(-172.687 50 50)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="6.666666666666666s"
          repeatCount="indefinite"
          keyTimes="0;1"
          values="0 50 50;-360 50 50"
        />
      </circle>
    </svg>
  );
};

export default Loader;
