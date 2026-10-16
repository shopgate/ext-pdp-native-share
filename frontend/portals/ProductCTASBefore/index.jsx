import React from 'react';
import { isIOSTheme } from '@shopgate/engage/core';
import { makeStyles } from '@shopgate/engage/styles';
import ShareButton from '../../components/ShareButton';
import config from '../../config.json';

const { useWithStickyButtons, iOSIconStyles } = config;

const useStyles = makeStyles()(() => ({
  iOSButtons: {
    position: 'absolute',
    right: 62,
    top: -20,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    ...(iOSIconStyles || {}),
  },
}));

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
