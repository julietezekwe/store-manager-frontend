/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import Footer from '../../../components/common/Footer.jsx';

let wrapper;
beforeEach(() => {
  wrapper = shallow(<Footer />);
});
describe('App Component', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
