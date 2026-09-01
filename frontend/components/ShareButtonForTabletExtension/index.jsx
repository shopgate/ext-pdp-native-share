import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import { i18n } from '@shopgate/engage/core';
import ShareIconiOS from '@shopgate/pwa-ui-ios/icons/ShareIcon';
import ShareIconGmd from '@shopgate/pwa-ui-material/icons/ShareIcon';
import isIOSTheme from '@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme';
import { withPageProductId } from '@shopgate-ps/pwa-extension-kit/connectors';
import { css } from 'glamor';
import connect from '../../connector';
import styles from './style';

css.global('.share-button-mobile-mode', { display: 'var(--share-button-mobile-mode)' });
const { style } = document.documentElement;

/**
 * The share button component for the tablet adjustments extension.
 */
class ShareButtonForTabletExtension extends Component {
  static propTypes = {
    shareItem: PropTypes.func.isRequired,
    'aria-hidden': PropTypes.bool,
    shareParams: PropTypes.shape(),
  };

  static defaultProps = {
    'aria-hidden': null,
    shareParams: null,
  };

  /**
   * Hide StickyShareButton if tablet-adjustment-extension is enabled and tablet mode is active
   */
  componentDidMount() {
    style.setProperty('--share-button-mobile-mode', 'none');
  }

  /**
   * Show StickyShareButton if mobile mode is active
   */
  componentWillUnmount() {
    style.setProperty('--share-button-mobile-mode', 'block');
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
   * Renders the share icon depending on theme
   * @returns {JSX}
   */
  renderIcon = () => (
    isIOSTheme ? <ShareIconiOS className={styles.icon} /> : <ShareIconGmd className={styles.icon} />
  );

  /**
   * Renders the component.
   * @returns {JSX|null}
   */
  render() {
    if (!this.props.shareParams || this.props.shareParams.deepLink === undefined) {
      return null;
    }

    return (
      <button
        aria-label={i18n.text('pdpNativeShare.shareButton.label')}
        aria-hidden={this.props['aria-hidden']}
        className={`ui-shared__share-button-for-tablet-extension ${styles.button}`}
        onClick={this.handleClick}
        data-test-id="shareButtonForTabletExtension"
        type="button"
      >
        <span>{this.renderIcon()}</span>
        <I18n.Text string="pdpNativeShare.shareButton.label" />
      </button>
    );
  }
}

export default withPageProductId(connect(ShareButtonForTabletExtension));
