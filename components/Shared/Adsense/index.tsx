/* eslint-disable react/static-property-placement */
import React from 'react';
import styles from './index.module.css';

interface Props {
  className?: string;
  style?: object;
  client: string;
  slot: string;
  layout?: string;
  layoutKey?: string;
  format?: string;
  path: string;
  responsive?: 'true' | 'false';
}

export default class Adsense extends React.Component<Props, {}> {
  static defaultProps: {
    className: string;
    style: { display: string };
    format: string;
    layout: string;
    layoutKey: string;
    responsive: string;
  };

  componentDidMount(): void {
    if (typeof window !== 'undefined') {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {}
        );
      } catch (e) {
        // rip
      }
    }
  }

  shouldComponentUpdate(nextProps): boolean {
    const { path } = this.props;

    return nextProps.path !== path;
  }

  componentDidUpdate(): void {
    if (typeof window !== 'undefined') {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {}
        );
      } catch (e) {
        // rip
      }
    }
  }

  render(): JSX.Element {
    const {
      className,
      style,
      client,
      slot,
      layout,
      layoutKey,
      format,
      responsive,
      path
    } = this.props;

    return typeof window !== 'undefined' &&
      (window as any)?.adsbygoogle?.loaded ? (
      <div key={path} className={styles.root}>
        <ins
          key={path}
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
  }
}

Adsense.defaultProps = {
  className: '',
  style: { display: 'block' },
  format: 'auto',
  layout: '',
  layoutKey: '',
  responsive: 'false'
};
