import { ITEM_PATTERN } from '@shopgate/engage/product';
import { isIOSTheme, useRoute } from '@shopgate/engage/core';
import ShareButton from '../../components/ShareButton';

/**
 * @param {Object} props Props.
 * @returns {JSX.Element|null}
 */
const NavbarNavigatorCartButtonBefore = (props) => {
  const { pattern } = useRoute();

  if (pattern !== ITEM_PATTERN || isIOSTheme()) {
    return null;
  }

  return <ShareButton {...props} />;
};

export default NavbarNavigatorCartButtonBefore;
