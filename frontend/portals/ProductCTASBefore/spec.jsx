import React from 'react';
import { mount } from 'enzyme';

const MockedShareButton = () => (<div>ShareButton</div>);
jest.mock('../../components/ShareButton', () => MockedShareButton);
let mockedIsIOS = true;
jest.mock('@shopgate-ps/pwa-extension-kit/env/helpers/isIOSTheme', () => () => mockedIsIOS);

describe('IosShareButton', () => {
  // eslint-disable-next-line global-require
  const ShareButton = require('./index').default;
  it('should render ShareButton', () => {
    const component = mount(<ShareButton />);
    expect(component.find(MockedShareButton).exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });

  it('should render null', () => {
    mockedIsIOS = false;
    const component = mount(<ShareButton />);
    expect(component.html()).toBe(null);
  });
});
