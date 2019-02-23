import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllSales } from '../../actions/salesAction';

export class AllSales extends Component {
  async componentDidMount() {
    await this.props.getAllSales();
  }

  render() {
    const { sales } = this.props.sales;
    return (
      <React.Fragment>
        <div className="col-8">
          <div className="center">
            <div className="col-3 " id="totalProducts">
              Total Products Sold: {sales.totalQuantitySold}
            </div>
            <div className="col-4" id="totalPrice">
              Amount Realized: &#8358; {sales.totalAmount}
            </div>
            <div className="col-3" id="totalSales">
              Unique Products No: {sales.totalProductsSold}
            </div>
          </div>

          <div className="card col-11">
            <table className="table">
              <thead>
                <tr>
                  <th>Product Id</th>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Seller</th>
                </tr>
              </thead>
              <tbody>
                {sales.SalesModel
                  && sales.SalesModel.map((sale, i) => (
                    <tr key={i}>
                      <td>{sale.productid}</td>
                      <td>{sale.productname}</td>
                      <td>{sale.description}</td>
                      <td>{sale.quantity}</td>
                      <td>{sale.price}</td>
                      <td>{sale.name}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  sales: state.sales,
});
export default connect(
  mapStateToProps,
  { getAllSales },
)(AllSales);
