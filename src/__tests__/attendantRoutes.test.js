/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { MemoryRouter, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ProductList from '../components/common/ProductList.jsx';
import ConnectedAttendant,
{ AttendantRoutes } from '../AttendantRoutes.jsx';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

const props = {
  component: ProductList,
  login: {
    isLoggedIn: true,
    user: { role: '' },
  },

};

const wrapper = mount(<MemoryRouter>
  <AttendantRoutes {...props} />
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
            <ConnectedAttendant/>
        </Provider>,
    );
    expect(connectWrapper).toMatchSnapshot();
  });
});
