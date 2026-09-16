import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import { i18n } from '@shopgate/engage/core';
import { makeStyles, injectGlobal } from '@shopgate/engage/styles';
import ShareIconiOS from '@shopgate/pwa-ui-ios/icons/ShareIcon';
import ShareIconGmd from '@shopgate/pwa-ui-material/icons/ShareIcon';
import isIOSTheme from '@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme';
import { withPageProductId } from '@shopgate-ps/pwa-extension-kit/connectors';
import connect from '../../connector';

const GAP_BIG = 16;

injectGlobal({
  '.share-button-mobile-mode': { display: 'var(--share-button-mobile-mode)' },
});

const useStyles = makeStyles()(theme => ({
  button: {
    marginTop: 10,
    display: 'block',
    flexGrow: 1,
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
    fontSize: 16,
    fontWeight: 700,
    borderRadius: 5,
    width: '100%',
    outline: 0,
    transition: 'width 300ms cubic-bezier(0.25, 0.1, 0.25, 1)',
    padding: `${(GAP_BIG * 0.75) - 1}px ${GAP_BIG * 0.6}px ${(GAP_BIG * 0.75) + 1}px`,
    '@media only screen and (min-width: 786px)': {
      marginLeft: 8,
    },
    '@media only screen and (max-width: 786px)': {
      marginLeft: 0,
    },
  },
  icon: {
    display: 'inline',
    marginBottom: -2,
    marginRight: 5,
  },
}));

/**
 * The share button component for the tablet adjustments extension.
 * @param {Object} props Props.
 * @returns {JSX.Element|null}
 */
const ShareButtonForTabletExtension = ({
  'aria-hidden': ariaHidden,
  shareItem,
  shareParams,
}) => {
  const { classes } = useStyles();

  useEffect(() => {
    const { style } = document.documentElement;
    style.setProperty('--share-button-mobile-mode', 'none');

    return () => {
      style.setProperty('--share-button-mobile-mode', 'block');
    };
  }, []);

  if (!shareParams || shareParams.deepLink === undefined) {
    return null;
  }

  const icon = isIOSTheme()
    ? <ShareIconiOS className={classes.icon} />
    : <ShareIconGmd className={classes.icon} />;

  return (
    <button
      aria-label={i18n.text('pdpNativeShare.shareButton.label')}
      aria-hidden={ariaHidden}
      className={`ui-shared__share-button-for-tablet-extension ${classes.button}`}
      onClick={shareItem}
      data-test-id="shareButtonForTabletExtension"
      type="button"
    >
      <span>{icon}</span>
      <I18n.Text string="pdpNativeShare.shareButton.label" />
    </button>
  );
};

ShareButtonForTabletExtension.propTypes = {
  shareItem: PropTypes.func.isRequired,
  'aria-hidden': PropTypes.bool,
  shareParams: PropTypes.shape(),
};

ShareButtonForTabletExtension.defaultProps = {
  'aria-hidden': null,
  shareParams: null,
};

export default withPageProductId(connect(ShareButtonForTabletExtension));
