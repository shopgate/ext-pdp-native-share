import React from 'react';
import isIOSTheme from '@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme';
import ShareButton from '../../components/ShareButton';
import useStyles from './styles';
import config from '../../config.json';

const { useWithStickyButtons } = config;

export default (props) => {
  const { classes } = useStyles();

  if (!isIOSTheme() || useWithStickyButtons) {
    return null;
  }

  return (
    <div className={`${classes.iOSButtons} native-share__button`}>
      <ShareButton {...props} />
    </div>
  );
};
