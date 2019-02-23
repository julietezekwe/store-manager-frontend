/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { AllUsers } from '../../../components/Admin/AllUsers.jsx';

let wrapper;
const props = {
  loginUser: () => Promise.resolve(),
  login: {
    isLoadingUsers: false,
    users: {
      UsersModel: [{
        id: 1,
        name: 'admin',
        username: 'admin',
        email: 'admin@gmail.com',
        role: 'admin',
      }],
    },
  },
};
beforeEach(() => {
  wrapper = shallow(<AllUsers {...props} />);
});
describe('App Component', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
