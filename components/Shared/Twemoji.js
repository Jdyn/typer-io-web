/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-filename-extension */
import React, { memo } from 'react';
import twemoji from 'twemoji';

const Twemoji = ({ emoji }) => (
  <span
    style={{ lineHeight: "10px" }}
    dangerouslySetInnerHTML={{
      __html: twemoji.parse(emoji, {
        folder: 'svg',
        ext: '.svg'
      })
    }}
  />
);

export default memo(Twemoji);
