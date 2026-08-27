import React from 'react';
import isIOSTheme from '@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme';
import ShareButton from '../../components/ShareButton';
import styles from './styles';
import config from '../../config.json';

const { useWithStickyButtons } = config;

export default (props) => {
  if (!isIOSTheme() || useWithStickyButtons) {
    return null;
  }
  return (
    <div className={`${styles.iOSButtons} native-share__button`}>
      <ShareButton {...props} />
    </div>
  );
};
