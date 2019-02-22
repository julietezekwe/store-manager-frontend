/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../../../components/common/NavBar.jsx';


let wrapper;
const props = {
  user: {
    token: 'bhwqjkbj',
    role: 'attendant',
    logout: jest.fn(),
  },
};
describe('Menu Component', () => {
  it('should match snapshot', () => {
    wrapper = shallow(<NavBar {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });
  describe('Elements', () => {
    beforeEach(() => {
      wrapper = mount(<MemoryRouter><NavBar {...props}/></MemoryRouter>);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should have one add to cart when attendant is logged in element', () => {
      expect(wrapper.find('.fa-shopping-cart').length).toEqual(1);
    });
    it('should have login link for non logged in users', () => {
      const newProps = {
        user: {
          token: '',
          role: '',
          logout: jest.fn(),
        },
      };
      wrapper = mount(<MemoryRouter><NavBar {...newProps}/></MemoryRouter>);
      expect(wrapper.find('#auth').first().text().trim()).toEqual('login');
    //   console.log(wrapper.find('#auth').at(0).text().length);
    });
  });
});
