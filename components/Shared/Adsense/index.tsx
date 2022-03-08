import { memo, useEffect, useState } from 'react';

import styles from './index.module.css';

interface Props {
  className?: string;
  style?: Record<string, unknown>;
  client: string;
  slot: string;
  layout?: string;
  layoutKey?: string;
  format?: string;
  path?: string;
}

const Adsense = ({
  className,
  style,
  client,
  slot,
  layout,
  layoutKey,
  format,
  path
}: Props): JSX.Element => {
  const [isAds, setAds] = useState(true);

  useEffect(() => {
    const ins = document.getElementById('gad');
    if (ins && ins.hasChildNodes()) {
      setAds(true);
    } else {
      setAds(false);
    }
  }, []);

  return isAds ? (
    <section className={className}>
      <div id={slot} key={path} className={styles.root}>
        <ins
          key={path}
          id="gad"
          className="adsbygoogle"
          style={style}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-layout={layout}
          data-ad-layout-key={layoutKey}
          data-ad-format={format}
          data-full-width-responsive={false}
        />
      </div>
    </section>
  ) : null;
};

Adsense.defaultProps = {
  className: '',
  style: { display: 'block' },
  format: 'fluid',
  layout: 'in-article',
  layoutKey: '',
  path: ''
};

export default memo(Adsense);
