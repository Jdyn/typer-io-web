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

  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {}
        );

        if ((window as any).adsbygoogle.loaded) {
          setShow(true);
        }
      } catch (e) {}
    }, 2000);
  }, []);

  return (
    show && (
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
          data-full-width-responsive={false}
        />
      </div>
    )
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
