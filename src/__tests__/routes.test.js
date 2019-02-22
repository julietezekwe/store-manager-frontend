/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import Routes from '../Routes.jsx';

let wrapper;
beforeEach(() => {
  wrapper = shallow(<Routes />);
});
describe('Routes Component', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
