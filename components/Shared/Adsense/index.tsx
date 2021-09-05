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
  responsive?: boolean;
}

const Adsense = (props: Props): JSX.Element => {
  const { className, style, client, slot, layout, layoutKey, format, path, responsive } = props;

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

  return isAds ? (
    <div id={slot} key={path} className={`${styles.root} ${className}`}>
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
  ) : null;
};

Adsense.defaultProps = {
  className: '',
  style: { display: 'block' },
  format: 'auto',
  layout: '',
  layoutKey: '',
  path: '',
  responsive: true
};

export default memo(Adsense);
