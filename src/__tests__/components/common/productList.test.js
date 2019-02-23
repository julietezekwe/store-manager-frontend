/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ConnectedProductList, { ProductList } from '../../../components/common/ProductList.jsx';

sinon.stub(window.location, 'reload');
const mockStore = configureStore([thunk]);
const props = {
  getAllProducts: jest.fn(),
  products: [{
    id: 1,
    name: 'silver shoes',
    price: 1000,
    quantity: 120,
    min: 1,
    description: 'Very beautiful',
    image: 'image.jpg',
  }, {
    id: 2,
    name: 'blue shoes',
    price: 10000,
    quantity: 1200,
    min: 1,
    description: 'Very beautiful',
    image: 'image.jpg',
  },
  {
    id: 3,
    name: 'blue shoes',
    price: 10000,
    quantity: 0,
    min: 1,
    description: 'Very beautiful',
    image: 'image.jpg',
  }],
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
      <ProductList {...props} />
    </Provider>,
  );
});

describe('ProductList Component', () => {
  it('should match snapshot', () => {
    mount(
      <Provider store={store}>
        <ConnectedProductList />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should call getAllProducts on componentDidMount', () => {
    expect(props.getAllProducts).toHaveBeenCalled();
  });
  it('should display a form for adding product  when admin is logged in',
    () => {
      expect(wrapper.find('Form').at(0).prop('action')).toEqual('addProduct');
    });
  it('displays the correct number of products', () => {
    expect(wrapper.find('.myCard')).toHaveLength(3);
    expect(wrapper.find('.ribbon')).toHaveLength(3);
  });
  it('displays outof stick for a product that has quantity less tahn 1', () => {
    expect(wrapper.find('.ribbon').first().text().trim()).toEqual('In Stock (120)');
    expect(wrapper.find('.ribbon').last().text().trim()).toEqual('Out of stock');
  });
  it('Should add a product to cart', () => {
    const newProps = {
      ...props,
      login:
      {
        ...props.login,
        user: {
          id: 2,
          role: 'attendant',
          name: 'attendant',
          username: 'attendant',
          email: 'attendant@gmail.com',
        },
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <ProductList {...newProps} />
      </Provider>,
    );
    localStorage.setItem(2, '{"cartNo":[2]}'); // Products added to cart by the logged in attendant
    const productComponent = wrapper.find('ProductList').instance();
    const spy = jest.spyOn(productComponent, 'handleAddToCart');
    const addToCartButton = wrapper.find('#cart').at(0);
    addToCartButton.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
