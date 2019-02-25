/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from '../../App.jsx';

const mockStore = configureStore([thunk]);
const props = {
  login: {
    isloggedIn: true,
    user: {
      id: 1,
      role: 'admin',
      name: 'admin',
      username: 'admin',
      email: 'admin@gmail.com',
    },
  },
};

const store = mockStore({ ...props });

let wrapper;
beforeEach(() => {
  wrapper = mount(
    <Provider store={store}>
        <App {...props} />
</Provider>,
  );
});
describe('App Component', () => {
  it('should match snapshot', () => {
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');
    const Apps = wrapper.find('App').instance();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('NavBar')
      .prop('logout')).toBe(Apps.handleLogout);
  });
});
