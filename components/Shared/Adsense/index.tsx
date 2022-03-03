import { useEffect, memo, useState } from 'react';
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
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      // catch
    }

    if (
      (Array.isArray((window as any).adsbygoogle) && !(window as any).adsbygoogle?.loaded) ||
      false
    ) {
      setAds(false);
    } else if (typeof (window as any).adsbygoogle === 'object') {
      setAds(true);
    }
  }, []);

  return (
    <section className={className}>
      <div id={slot} key={path} className={styles.root}>
        <ins
          key={path}
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
  );
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
