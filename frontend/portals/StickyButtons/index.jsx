import React from 'react';
import { css } from 'glamor';
import ShareButton from '../../components/ShareButton';
import config from '../../config.json';
import styles from '../../components/ShareButton/style';

const { useWithStickyButtons } = config;

const shareButton = css({
  minWidth: 44,
  height: 44,
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
      className={`${styles.buttoniOSThemeiOSIcon} ${shareButton}`}
      rippleClassname={rippleButton}
      {...props}
    />
  );
};
