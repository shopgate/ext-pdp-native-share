import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { i18n } from '@shopgate/engage/core';
import * as engageComponents from '@shopgate/engage/components';
import ShareIconiOS from '@shopgate/pwa-ui-ios/icons/ShareIcon';
import ShareIconGmd from '@shopgate/pwa-ui-material/icons/ShareIcon';
import Ripple from '@shopgate/pwa-ui-shared/Ripple';
import { withPageProductId } from '@shopgate-ps/pwa-extension-kit/connectors';
import isIOSTheme from '@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme';
import styles from './style';
import getConfig from '../../helpers/getConfig';
import connect from '../../connector';

const { IconButton } = engageComponents;

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
 * Button style for pwa versions that don't ship IconButton yet.
 * @returns {string}
 */
const getLegacyStyle = () => {
  if (isIOSTheme()) {
    return usesIOSIcon() ? styles.buttoniOSThemeiOSIcon : styles.buttoniOSThemeMaterialIcon;
  }

  return usesIOSIcon() ? styles.buttonMaterialThemeiOSIcon : styles.buttonMaterialThemeMaterialIcon;
};

/**
 * The share button component.
 * @param {Object} props Props.
 * @returns {JSX.Element|null}
 */
const ShareButton = ({
  className,
  rippleClassname,
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
  const label = i18n.text('pdpNativeShare.shareButton.label');

  if (IconButton) {
    return (
      <IconButton
        aria-label={label}
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
  }

  return (
    <button
      className={`${getLegacyStyle()} ${className} share-button-mobile-mode`}
      data-test-id="shareIcon"
      type="button"
      aria-label={label}
    >
      <Ripple className={`${styles.ripple(isIOSTheme())} ${rippleClassname}`} onComplete={handleClick}>
        {icon}
      </Ripple>
    </button>
  );
};

ShareButton.propTypes = {
  shareItem: PropTypes.func.isRequired,
  className: PropTypes.string,
  // Only applied by the legacy button. IconButton brings its own ripple.
  rippleClassname: PropTypes.string,
  shareParams: PropTypes.shape(),
  // Only applied by IconButton. The legacy button is sized by its own styles.
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

ShareButton.defaultProps = {
  rippleClassname: '',
  className: '',
  shareParams: null,
  size: 'medium',
};

export default withPageProductId(connect(ShareButton));
