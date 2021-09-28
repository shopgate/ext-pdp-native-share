import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { i18n } from '@shopgate/engage/core';
import ShareIconiOS from '@shopgate/pwa-ui-ios/icons/ShareIcon';
import ShareIconGmd from '@shopgate/pwa-ui-material/icons/ShareIcon';
import Ripple from '@shopgate/pwa-ui-shared/Ripple';
import { withPageProductId } from '@shopgate-ps/pwa-extension-kit/connectors';
import isIOSTheme from '@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme';
import styles from './style';
import getConfig from '../../helpers/getConfig';
import connect from '../../connector';

/**
 * ShareButton component
 */
class ShareButton extends Component {
  static propTypes = {
    shareItem: PropTypes.func.isRequired,
    className: PropTypes.string,
    rippleClassname: PropTypes.string,
    shareParams: PropTypes.shape(),
  };

  static defaultProps = {
    rippleClassname: '',
    className: '',
    shareParams: null,
  };

  static config = getConfig();

  /**
   * Gets the icon style.
   * @returns {string}
   */
  static getIconStyle() {
    if (isIOSTheme()) {
      return this.config.iOSIcon === 'ios' ? styles.buttoniOSThemeiOSIcon : styles.buttoniOSThemeMaterialIcon;
    }
    return this.config.gmdIcon === 'gmd' ? styles.buttonMaterialThemeMaterialIcon : styles.buttonMaterialThemeiOSIcon;
  }

  /**
   * Renders the share icon depending on theme
   * @returns {JSX}
   */
  static renderIcon() {
    if (isIOSTheme()) {
      return this.config.iOSIcon === 'ios' ? <ShareIconiOS /> : <ShareIconGmd />;
    }

    return this.config.gmdIcon === 'gmd' ? <ShareIconGmd /> : <ShareIconiOS />;
  }

  /**
   * Handles the share button click
   * Show's share screen for app
   * @param {Object} event The click event object
   */
  handleClick = () => {
    this.props.shareItem();
  };

  /**
   * Renders the components
   * @returns {JSX}
   */
  render() {
    if (!this.props.shareParams || this.props.shareParams.deepLink === undefined) {
      return null;
    }

    return (
      <button
        className={`${this.constructor.getIconStyle()} ${this.props.className}`}
        data-test-id="shareIcon"
        type="button"
        aria-label={i18n.text('product.share')}
      >
        <Ripple className={`${styles.ripple(isIOSTheme())} ${this.props.rippleClassname}`} onComplete={this.handleClick}>
          {this.constructor.renderIcon()}
        </Ripple>
      </button>
    );
  }
}

export default withPageProductId(connect(ShareButton));
