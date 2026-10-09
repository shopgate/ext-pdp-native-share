import React from 'react';
import { mount } from 'enzyme';

const MockedShareButton = () => (<div>ShareButton</div>);
jest.mock('../../components/ShareButton', () => MockedShareButton);

let mockedIsIOS = false;
let mockedPattern = '/item/:productId';
jest.mock('@shopgate/engage/core', () => ({
  isIOSTheme: () => mockedIsIOS,
  useRoute: () => ({ pattern: mockedPattern }),
}));
jest.mock('@shopgate/engage/product', () => ({
  ITEM_PATTERN: '/item/:productId',
}));

describe('GmdShareButton', () => {
  // eslint-disable-next-line global-require
  const ShareButton = require('./index').default;
  it('should render GmdShareButton', () => {
    const component = mount(<ShareButton />);
    expect(component.find(MockedShareButton).exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });

  it('should render null for iOS theme', () => {
    mockedIsIOS = true;
    const component = mount(<ShareButton />);
    expect(component.html()).toBe(null);
  });

  it('should render null for different pages', () => {
    mockedPattern = '/';
    mockedIsIOS = false;
    const component = mount(<ShareButton />);
    expect(component.html()).toBe(null);
  });
});
