/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { SalesRecord } from '../../../components/Attendant/SalesRecord.jsx';

let wrapper;
const props = {
  getPersonalSales: () => Promise.resolve(),
  sales: {
    mySales: {
      records: {
        totalProducts: 10,
        amount: 12099,
        totalSales: 4,
      },
      saleDetail: [{
        productid: 1,
        productname: 'shoes',
        description: 'fine',
        quantity: 10,
        price: 1200,
        created_at: new Date(),
      }],
    },
  },
  user: {
    id: 3,
    role: 'attendant',
    email: 'chidimma@yahoo.com',
    name: 'chidimma',
    username: 'chidimma',
  },
};
beforeEach(() => {
  wrapper = mount(<SalesRecord {...props} />);
});
describe('SalesRecord Component', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
