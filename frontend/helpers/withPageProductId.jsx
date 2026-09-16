import React from 'react';
import { useRoute } from '@shopgate/engage/core';
import { hex2bin } from '@shopgate/pwa-common/helpers/data';

/**
 * Injects the decoded productId of the current route into the wrapped component. Reads from the
 * route (available app-wide) rather than the product context, so it also works inside the navbar.
 * @param {Function} WrappedComponent The component to wrap.
 * @returns {Function}
 */
const withPageProductId = WrappedComponent => (props) => {
  const { params = {} } = useRoute();
  const productId = params.productId ? hex2bin(params.productId) : null;

  return <WrappedComponent productId={productId} {...props} />;
};

export default withPageProductId;
