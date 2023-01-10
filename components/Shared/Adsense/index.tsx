import { useEffect } from 'react';

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
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      // catch
    }
  }, []);

  return (
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

export default Adsense;
