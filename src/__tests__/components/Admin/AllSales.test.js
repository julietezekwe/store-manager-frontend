/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { AllSales } from '../../../components/Admin/AllSales.jsx';

let wrapper;
const props = {
  getAllSales: () => Promise.resolve(),
  sales: {
    sales: {
      totatQuantitySold: 1,
      totalAmount: 10,
      totalProductsSold: 199,
      SalesModel: [{
        productid: 1,
        productname: 'shoes',
        description: 'fine',
        quantity: 10,
        price: 1200,
        name: 'oge',
      }],
    },
  },
};
beforeEach(() => {
  wrapper = mount(<AllSales {...props} />);
});
describe('App Component', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
