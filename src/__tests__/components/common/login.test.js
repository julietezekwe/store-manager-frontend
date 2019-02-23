/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { Login } from '../../../components/common/Login.jsx';

let wrapper;

describe('<LoginPage />', () => {
  beforeEach(() => {
    const props = {
      loginUser: () => Promise.resolve(),
      login: {
        isLoggedIn: false,
        user: null,
      },
    };
    wrapper = shallow(<Login {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls onButtonSubmit()', () => {
    const values = {
      password: 'admin',
      email: 'admin@gmail.com',
    };
    sinon.spy(wrapper.instance(), 'onButtonSubmit');
    wrapper.instance().onButtonSubmit(values);
    expect(wrapper.instance().onButtonSubmit.calledOnce)
      .toEqual(true);
    expect(wrapper.instance().onButtonSubmit.calledWith(values));
  });
  it('calls onChangeHandler()', () => {
    const event = {
      target: {
        id: 'email',
        value: 'admin@gmail.com',
      },
    };
    sinon.spy(wrapper.instance(), 'onChangeHandler');
    wrapper.instance().onChangeHandler(event);
    expect(wrapper.instance().onChangeHandler.calledOnce)
      .toEqual(true);
    expect(wrapper.instance().onChangeHandler.calledWith(event));
  });
});
