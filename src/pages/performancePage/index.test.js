import React from 'react';
// import { expect } from 'chai';
import PerfComponent from './index.js'
import { LineChart } from './components';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux'
import { store } from '../../store'

configure({ adapter: new Adapter() });

describe('Chart Item', () => {
  it('should render Chart', () => {
    const wrapper = mount(
      <Provider store={store}>
        <PerfComponent />
      </Provider>);
    expect(wrapper.find(LineChart).length).toEqual(4);
  });
});