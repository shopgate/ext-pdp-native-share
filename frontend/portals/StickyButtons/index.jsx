import React from 'react';
import { css } from 'glamor';
import ShareButton from '../../components/ShareButton';
import config from '../../config.json';

const { useWithStickyButtons } = config;

const shareButton = css({
  marginRight: 15,
}).toString();

const rippleButton = css({
  fontSize: '29px !important',
}).toString();

export default (props) => {
  if (!useWithStickyButtons) {
    return null;
  }

  return (
    <ShareButton
      className={shareButton}
      rippleClassname={rippleButton}
      size="large"
      {...props}
    />
  );
};
