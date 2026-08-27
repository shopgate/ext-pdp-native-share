import React from 'react';
import { mount } from 'enzyme';

const MockedShareButton = () => (<div>ShareButton</div>);
jest.mock('../../components/ShareButton', () => MockedShareButton);

let mockedIsIOS = false;
jest.mock('@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme', () => () => mockedIsIOS);

let mockedPattern = '/item/:productId';
jest.mock('@shopgate-ps/pwa-extension-kit/connectors', () => ({
  withPageState: WrappedComponent => () => <WrappedComponent pattern={mockedPattern} />,
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
    expect(component.html()).toBe('');
  });

  it('should render null for different pages', () => {
    mockedPattern = '/';
    mockedIsIOS = false;
    const component = mount(<ShareButton />);
    expect(component.html()).toBe('');
  });
});
