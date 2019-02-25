/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { Checkout } from '../../../components/Attendant/Checkout.jsx';

sinon.stub(window.location, 'reload');
let wrapper;
const props = {
  getAllCartProducts: () => Promise.resolve(),
  handleCheckout: () => Promise.resolve(),
  sales: {
    cart: {
      cartProductDetails: [[{
        id: 1,
        productname: 'shoes',
        description: 'fine',
        quantity: 10,
        price: 1200,
        created_at: new Date(),
      }]],
    },
  },
  login: {
    user: {
      id: 3,
      role: 'attendant',
      email: 'chidimma@yahoo.com',
      name: 'chidimma',
      username: 'chidimma',
    },
  },
};
beforeEach(() => {
  wrapper = mount(<Checkout {...props} />);
});
describe('Checkout Component', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('calls handleRemoveFromCart()', () => {
    localStorage.setItem(3, '{"cartNo":[2, 6]}');
    sinon.spy(wrapper.instance(), 'handleRemoveFromCart');
    wrapper.instance().handleRemoveFromCart(2);
    expect(wrapper.instance().handleRemoveFromCart.calledOnce)
      .toEqual(true);
  });
  it('calls onQuantityChange()', () => {
    const quantity = 10;
    const id = 2;
    const price = 1000;
    // localStorage.setItem(3, '{"cartNo":[2, 6]}');
    sinon.spy(wrapper.instance(), 'onQuantityChange');
    wrapper.instance().onQuantityChange(quantity, id, price);
    expect(wrapper.instance().onQuantityChange.calledOnce)
      .toEqual(true);
  });
});
