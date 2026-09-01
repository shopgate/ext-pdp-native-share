import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

const mockedConfig = {
  gmdIcon: 'gmd',
  iOSIcon: 'ios',
};

jest.mock('../../helpers/getConfig', () => () => mockedConfig);
const mockedParams = {
  mockedShareParams: {
    title: 'title',
    imageURL: 'imageURL',
    deepLink: 'deepLink',
  },
};

let mockedIsIOS = true;
jest.mock('@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme', () => () => mockedIsIOS);

jest.mock('../../selectors/index', () => ({
  getShareParams: () => mockedParams.mockedShareParams,
}));

jest.mock('@shopgate-ps/pwa-extension-kit/connectors', () => ({
  withPageProductId: WrappedComponent => () => <WrappedComponent productId="foo" />,
}));

/**
 * Mocked function for shareItem
 * @param {Object} mockedShareParams mocked parameters
 */
const mockedShareItem = jest.fn();
jest.mock('@shopgate/pwa-core/commands/shareItem', () => () => mockedShareItem());

describe('ShareButton', () => {
  const makeComponent = () => {
    // eslint-disable-next-line global-require
    const ShareButton = require('./index').default;
    return mount((
      <Provider store={configureStore()({})}>
        <ShareButton />
      </Provider>
    ));
  };

  it('should render when shareParams exist and handle click', () => {
    const component = makeComponent();
    expect(component.find('ShareButton').props().shareParams).toMatchObject(mockedParams.mockedShareParams);
    expect(component).toMatchSnapshot();

    component.find('Ripple').invoke('onComplete')();
    expect(mockedShareItem).toHaveBeenCalled();
  });

  it('should render with gmd icon relying on theme', () => {
    mockedIsIOS = false;
    const component = makeComponent();
    expect(component.find('ShareButton').props().shareParams).toMatchObject(mockedParams.mockedShareParams);
    expect(component).toMatchSnapshot();
  });

  it('should render with ios icon relying on theme', () => {
    mockedIsIOS = true;
    const component = makeComponent();
    expect(component.find('ShareButton').props().shareParams).toMatchObject(mockedParams.mockedShareParams);
    expect(component).toMatchSnapshot();
  });

  it('should render with ios relying on config', () => {
    mockedIsIOS = false;
    mockedConfig.gmdIcon = 'ios';
    const component = makeComponent();
    expect(component.find('ShareButton').props().shareParams).toMatchObject(mockedParams.mockedShareParams);
    expect(component).toMatchSnapshot();
  });

  it('should render with gmd relying on config', () => {
    mockedIsIOS = true;
    mockedConfig.iOSIcon = 'gmd';
    const component = makeComponent();
    expect(component.find('ShareButton').props().shareParams).toMatchObject(mockedParams.mockedShareParams);
    expect(component).toMatchSnapshot();
  });

  it('should not render when deeplink is undefined', () => {
    mockedParams.mockedShareParams.deepLink = undefined;
    const component = makeComponent();
    expect(component.html()).toBe('');
  });
});
