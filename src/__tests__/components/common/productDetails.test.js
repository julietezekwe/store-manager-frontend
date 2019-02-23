/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { ProductDetail } from '../../../components/common/ProductDetails.jsx';

let wrapper;
const props = {
  getAproduct: () => Promise.resolve(),
  productDetail: {
    productid: 1,
    productname: 'shoes',
    description: 'fine',
    quantity: 10,
    price: 1200,
    min: 1,
    image: 'imag.url',
  },
};
beforeEach(() => {
  wrapper = mount(<ProductDetail {...props} />);
});
describe('ProductDetail Component', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
