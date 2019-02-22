/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import Attendant from '../../../components/Attendant/Attendant.jsx';

let wrapper;
beforeEach(() => {
  wrapper = shallow(<Attendant />);
});
describe('App Component', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should display three links on the dashboard', () => {
    expect(wrapper.find('a')).toHaveLength(2);
  });
  it('should have the right path links for the hrefs', () => {
    expect(wrapper.find('a').at(0).prop('href')).toEqual('/attendant/');
  });
});
