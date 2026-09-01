import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import ShareIconiOS from '@shopgate/pwa-ui-ios/icons/ShareIcon';
import ShareIconGmd from '@shopgate/pwa-ui-material/icons/ShareIcon';

const defaultConfig = {
  gmdIcon: 'gmd',
  iOSIcon: 'ios',
};

// Mutated rather than replaced between tests: the component reads the config once at module scope,
// so it keeps the object it received on the first import.
const mockedConfig = { ...defaultConfig };

jest.mock('../../helpers/getConfig', () => () => mockedConfig);

let mockedIsIOS = true;
jest.mock('@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme', () => () => mockedIsIOS);

jest.mock('../../selectors/index', () => ({
  getShareParams: () => ({
    title: 'title',
    imageURL: 'imageURL',
    deepLink: 'deepLink',
  }),
}));

jest.mock('@shopgate-ps/pwa-extension-kit/connectors', () => ({
  withPageProductId: WrappedComponent => () => <WrappedComponent productId="foo" />,
}));

const mockedShareItem = jest.fn();
jest.mock('@shopgate/pwa-core/commands/shareItem', () => () => mockedShareItem());

jest.mock('@shopgate/engage/components', () => ({
  // eslint-disable-next-line react/prop-types
  IconButton: ({ children, onClick }) => (
    <button type="button" onClick={onClick}>{children}</button>
  ),
}));

describe('ShareButton > IconButton', () => {
  const makeComponent = () => {
    // eslint-disable-next-line global-require
    const ShareButton = require('./index').default;

    return mount((
      <Provider store={configureStore()({})}>
        <ShareButton />
      </Provider>
    ));
  };

  beforeEach(() => {
    Object.assign(mockedConfig, defaultConfig);
    mockedIsIOS = true;
    mockedShareItem.mockClear();
  });

  it('should render an elevated IconButton on the ios theme', () => {
    mockedIsIOS = true;
    const props = makeComponent().find('IconButton').props();

    expect(props.variant).toBe('surface');
    expect(props.color).toBe('secondary');
    expect(props.size).toBe('medium');
    expect(props.testId).toBe('shareIcon');
    expect(props['aria-label']).toBe('pdpNativeShare.shareButton.label');
    expect(props.className).toContain('share-button-mobile-mode');
  });

  it('should render a flat IconButton for the material icon on the material theme', () => {
    mockedIsIOS = false;
    mockedConfig.gmdIcon = 'gmd';

    expect(makeComponent().find('IconButton').props().variant).toBe('surface');
  });

  it('should render an elevated IconButton for the ios icon on the material theme', () => {
    mockedIsIOS = false;
    mockedConfig.gmdIcon = 'ios';

    expect(makeComponent().find('IconButton').props().variant).toBe('surface');
  });

  it('should fall back to the icon of the active theme when the config could not be read', () => {
    Object.keys(mockedConfig).forEach((key) => { delete mockedConfig[key]; });

    mockedIsIOS = true;
    expect(makeComponent().find('IconButton').props().children.type).toBe(ShareIconiOS);

    mockedIsIOS = false;
    expect(makeComponent().find('IconButton').props().children.type).toBe(ShareIconGmd);
  });

  it('should share on click', () => {
    mockedIsIOS = true;
    const component = makeComponent();

    component.find('button').simulate('click');

    expect(mockedShareItem).toHaveBeenCalled();
  });
});
