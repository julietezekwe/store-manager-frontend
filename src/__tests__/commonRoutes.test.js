/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { MemoryRouter, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ProductDetails from '../components/common/ProductDetails.jsx';
import ConnectedCommon,
{ CommonRoutes } from '../CommonRoutes.jsx';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

const props = {
  component: ProductDetails,
  login: {
    isLoggedIn: true,
    user: { role: '' },
  },

};

const wrapper = mount(<MemoryRouter>
  <CommonRoutes {...props} />
</MemoryRouter>);
describe('<CommonRoutes />', () => {
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
            <ConnectedCommon/>
        </Provider>,
    );
    expect(connectWrapper).toMatchSnapshot();
  });
});
