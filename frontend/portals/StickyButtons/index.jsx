import React from 'react';
import { makeStyles } from '@shopgate/engage/styles';
import ShareButton from '../../components/ShareButton';
import config from '../../config.json';

const { useWithStickyButtons } = config;

const useStyles = makeStyles()(() => ({
  shareButton: {
    marginRight: 15,
  },
}));

export default (props) => {
  const { classes } = useStyles();

  if (!useWithStickyButtons) {
    return null;
  }

  return (
    <ShareButton
      className={classes.shareButton}
      size="large"
      {...props}
    />
  );
};
