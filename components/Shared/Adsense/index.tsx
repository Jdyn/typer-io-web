import { useEffect, memo, useState } from 'react';
import styles from './index.module.css';

interface Props {
  className?: string;
  style?: object;
  client: string;
  slot: string;
  layout?: string;
  layoutKey?: string;
  format?: string;
  path?: string;
  wrapperStyles?: object;
  responsive?: 'true' | 'false';
}

const Adsense = (props: Props): JSX.Element => {
  const {
    className,
    style,
    client,
    slot,
    layout,
    layoutKey,
    format,
    responsive,
    path,
    wrapperStyles
  } = props;

  const [display, setDisplay] = useState(true);

  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      );
    } catch (e) {}

    setDisplay(
      document.getElementById(slot).childNodes[0].childNodes.length !== 0
    );
  }, [slot]);

  return display ? (
    <div
      id={slot}
      key={path}
      className={styles.root}
      style={{ ...wrapperStyles }}
    >
      <ins
        key={path}
        className="adsbygoogle"
        style={{ ...style }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-layout={layout}
        data-ad-layout-key={layoutKey}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  ) : (
    <ins
      key={path}
      className={`adsbygoogle ${className}`}
      style={{ ...style }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-layout={layout}
      data-ad-layout-key={layoutKey}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    />
  );
};

Adsense.defaultProps = {
  className: '',
  style: { display: 'block' },
  wrapperStyles: {},
  format: 'auto',
  layout: '',
  layoutKey: '',
  path: '',
  responsive: 'false'
};

export default memo(Adsense);
