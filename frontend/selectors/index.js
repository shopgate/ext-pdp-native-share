import { createSelector } from 'reselect';
import { getProduct } from '@shopgate/pwa-common-commerce/product/selectors/product';

/**
 * Appends required params for legacy image server.
 * @param {string} href Url of the image.
 * @returns {string}
 */
const decorateLegacyImageUrl = (href) => {
  try {
    const url = new URL(href);
    url.searchParams.set('w', '880');
    url.searchParams.set('h', '880');

    return url.toString();
  } catch (err) {
    console.error(err);
    return href;
  }
};

/**
 * Sanitizes image url by detecting legacy urls and appending requided params.
 * @param {string} url Url.
 * @returns {string}
 */
const sanitizeImageUrl = (url) => {
  if (!(url && typeof url === 'string' && url.length)) {
    return '';
  }

  if (url.startsWith('https://img-cdn.shopgate.com')) {
    return decorateLegacyImageUrl(url);
  }

  return url;
};
/**
 * Params for share button
 * @return {Array}
 */
export const getShareParams = createSelector(
  getProduct,
  (currentProduct) => {
    if (!currentProduct) {
      return null;
    }

    const shareParams = {
      title: currentProduct.name,
      imageURL: sanitizeImageUrl(currentProduct.featuredImageUrl),
      deepLink: currentProduct.productUrl,
    };

    return shareParams;
  }
);
