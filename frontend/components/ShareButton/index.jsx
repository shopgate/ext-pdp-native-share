import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { i18n, isIOSTheme } from '@shopgate/engage/core';
import { IconButton } from '@shopgate/engage/components';
import ShareIconiOS from '@shopgate/pwa-ui-ios/icons/ShareIcon';
import ShareIconGmd from '@shopgate/pwa-ui-material/icons/ShareIcon';
import getConfig from '../../helpers/getConfig';
import withPageProductId from '../../helpers/withPageProductId';
import connect from '../../connector';

const config = getConfig();

/**
 * Whether the button shows the iOS share icon. The config is empty when it could not be read, so
 * the documented defaults of the two settings are applied here.
 * @returns {boolean}
 */
const usesIOSIcon = () => (isIOSTheme()
  ? (config.iOSIcon || 'ios') === 'ios'
  : (config.gmdIcon || 'gmd') !== 'gmd');

/**
 * The share button component.
 * @param {Object} props Props.
 * @returns {JSX.Element|null}
 */
const ShareButton = ({
  className,
  shareItem,
  shareParams,
  size,
}) => {
  const handleClick = useCallback(() => {
    shareItem();
  }, [shareItem]);

  if (!shareParams || shareParams.deepLink === undefined) {
    return null;
  }

  const icon = usesIOSIcon() ? <ShareIconiOS /> : <ShareIconGmd />;

  return (
    <IconButton
      aria-label={i18n.text('pdpNativeShare.shareButton.label')}
      variant="surface"
      color="secondary"
      size={size}
      className={`${className} share-button-mobile-mode`}
      onClick={handleClick}
      testId="shareIcon"
    >
      {icon}
    </IconButton>
  );
};

ShareButton.propTypes = {
  shareItem: PropTypes.func.isRequired,
  className: PropTypes.string,
  shareParams: PropTypes.shape(),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

ShareButton.defaultProps = {
  className: '',
  shareParams: null,
  size: 'medium',
};

export default withPageProductId(connect(ShareButton));
