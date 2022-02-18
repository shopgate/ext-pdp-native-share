import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import ShareIconiOS from '@shopgate/pwa-ui-ios/icons/ShareIcon';
import ShareIconGmd from '@shopgate/pwa-ui-material/icons/ShareIcon';
import isIOSTheme from '@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme';
import { withPageProductId } from '@shopgate-ps/pwa-extension-kit/connectors';
import { css } from 'glamor';
import connect from '../../connector';
import styles from './style';

/**
 * The share button component for the tablet adjustments extension.
 */
class ShareButtonForTabletExtension extends Component {
  static propTypes = {
    shareItem: PropTypes.func.isRequired,
    'aria-hidden': PropTypes.bool,
    shareParams: PropTypes.shape(),
  };

  /**
   * Context types definition.
   * @type {{i18n: shim}}
   */
  static contextTypes = {
    i18n: PropTypes.func,
  };

  static defaultProps = {
    'aria-hidden': null,
    shareParams: null,
  };

  /**
   * Construct and init state
   * @param {Object} props Component props
   */
  constructor(props) {
    super(props);
    this.clickedOnce = false;
  }

  /**
   * Hide StickyShareButton if tablet-adjustment-extension is enabled and tablet mode is active
   */
  componentDidMount() {
    css.global('.share-button-mobile-mode', { display: 'none' });
  }

  /**
   * Show StickyShareButton if mobile mode is active
   */
  componentWillUnmount() {
    css.global('.share-button-mobile-mode', { display: 'block' });
  }

  /**
   * Returns text for aria-label.
   * @returns {string}
   */
  getLabel() {
    const { __ } = this.context.i18n();
    const lang = 'shareButton.label';
    return __(lang);
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
        aria-label={this.getLabel()}
        aria-hidden={this.props['aria-hidden']}
        className={`ui-shared__share-button-for-tablet-extension ${styles.button}`}
        onClick={this.handleClick}
        data-test-id="shareButtonForTabletExtension"
        type="button"
      >
        <span>{this.renderIcon()}</span>
        <I18n.Text string="shareButton.label" />
      </button>
    );
  }
}

export default withPageProductId(connect(ShareButtonForTabletExtension));
