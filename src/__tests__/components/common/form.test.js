/* eslint-disable no-undef */
import React from 'react';
import { Form } from '../../../components/common/Form.jsx';

let wrapper;

const props = {
  action: 'addProduct',
  prodId: 2,
  products: {
    isLoading: false,
    isAdding: false,
    products: [
      {
        id: 2,
        productname: 'Silver Shoe edit',
        description: 'it is very beautiful please try it',
        image:
          'https://res.cloudinary.com/julietezekwe/image/upload/v1550160062/epp8xwbrnfzngjty2o64.jpg',
        price: 1000,
        quantity: 12,
        min: 1,
        category: 'Not set',
        created_at: '2019-02-14T14:09:50.480Z',
      },
    ],
  },
  addProduct: () => Promise.resolve(),
  editProduct: () => Promise.resolve(),
  deleteProduct: () => Promise.resolve(),
};

describe('<LoginForm />', () => {
  beforeEach(() => {
    wrapper = shallow(<Form {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('renders add product form when action is addProduct', () => {
    expect(wrapper.find('.add').length).toEqual(1);
  });
  it('renders add product form when action is addProduct', () => {
    expect(wrapper.find('#submit-product').length).toEqual(1);
  });
  it('calls submitProduct()', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    sinon.spy(wrapper.instance(), 'submitProduct');
    wrapper.instance().submitProduct(e);
    expect(wrapper.instance().submitProduct.calledOnce)
      .toEqual(true);
    expect(wrapper.instance().submitProduct.calledWith(e));
  });
  it('calls onFormFieldChange()', () => {
    const event = {
      target: { id: 'quantity', value: 10 },
    };
    sinon.spy(wrapper.instance(), 'onFormFieldChange');
    wrapper.instance().onFormFieldChange(event);
    expect(wrapper.instance().onFormFieldChange.calledOnce)
      .toEqual(true);
    expect(wrapper.instance().onFormFieldChange.calledWith(event));
  });
  it('renders delete form when action is deleteProduct', () => {
    const newProps = {
      ...props,
      action: 'deleteProduct',
    };
    wrapper = shallow(<Form {...newProps} />);
    expect(wrapper.find('.delete').length).toEqual(1);
  });
  it('calls deleteProduct()', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    sinon.spy(wrapper.instance(), 'deleteProduct');
    wrapper.instance().deleteProduct(e);
    expect(wrapper.instance().deleteProduct.calledOnce)
      .toEqual(true);
    expect(wrapper.instance().deleteProduct.calledWith(e));
  });
  it('renders edit product form when action is editProduct', () => {
    const newProps = {
      ...props,
      action: 'editProduct',
    };

    wrapper = shallow(<Form {...newProps} />);

    expect(wrapper.find('.edit').length).toEqual(1);
  });
  it('calls updateProduct()', () => {
    const e = {
      preventDefault: jest.fn(),
    };
    sinon.spy(wrapper.instance(), 'updateProduct');
    wrapper.instance().updateProduct(e);
    expect(wrapper.instance().updateProduct.calledOnce)
      .toEqual(true);
    expect(wrapper.instance().updateProduct.calledWith(e));
  });
});
