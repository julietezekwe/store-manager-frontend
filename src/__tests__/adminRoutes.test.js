import 'babel-polyfill';
import React from 'react';
import { MemoryRouter, Redirect } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ProductList from '../components/common/ProductList.jsx';
import ConnectedAdmin,
{ AdminRoutes } from '../AdminRoutes.jsx';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

const props = {
  component: ProductList,
  login: {
    isLoggedIn: false,
    user: { role: 'attendant' },
  },

};

const wrapper = mount(<MemoryRouter>
  <AdminRoutes {...props} />
</MemoryRouter>);
describe('<PrivateRoute />', () => {
  it(
    `renders a redirect component when a user tries to access
    an admin route`,
    () => {
      const expected = <Redirect to='/' />;
      expect(wrapper.contains(expected)).toEqual(true);
    },
  );
});
describe('<ConnectedAdminRoute>', () => {
  it('should match snapshot', () => {
    const connectWrapper = shallow(
        <Provider store={store}>
            <ConnectedAdmin/>
        </Provider>,
    );
    expect(connectWrapper).toMatchSnapshot();
  });
});
