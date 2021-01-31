import React, { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import styles from './index.module.css';

interface Props {
  className?: string;
  style?: object;
  client: string;
  slot: string;
  layout?: string;
  layoutKey?: string;
  format?: string;
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
    responsive
  } = props;

  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      );
      setLoaded((window as any).adsbygoogle.loaded || false);
    }
  }, []);

  return loaded ? (
    <div className={styles.root}>
      <ins
        className={`${className} adsbygoogle`}
        style={{ ...style }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-layout={layout}
        data-ad-layout-key={layoutKey}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  ) : null;
};

Adsense.defaultProps = {
  className: '',
  style: { display: 'block' },
  format: 'auto',
  layout: '',
  layoutKey: '',
  responsive: 'false'
};

export default Adsense;
