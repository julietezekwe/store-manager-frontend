/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import ProductList from '../../../components/common/ProductList.jsx';

let wrapper;
beforeEach(() => {
  wrapper = shallow(<ProductList />);
});
describe('App Component', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
