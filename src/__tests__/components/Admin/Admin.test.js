/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import Admin from '../../../components/Admin/Admin.jsx';

let wrapper;
beforeEach(() => {
  wrapper = shallow(<Admin />);
});
describe('App Component', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should display three links on the dashboard', () => {
    expect(wrapper.find('a')).toHaveLength(3);
  });
  it('should have the right path links for the hrefs', () => {
    expect(wrapper.find('a').at(0).prop('href')).toEqual('/admin/');
  });
});
