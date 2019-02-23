import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPersonalSales } from '../../actions/salesAction';

export class SalesRecord extends Component {
  async componentDidMount() {
    await this.props.getPersonalSales();
  }

  render() {
    const { mySales } = this.props.sales;
    return (
      <React.Fragment>
        <div className="col-8">
          <div className="center">
            <div className="col-3 " id="totalProducts">
              Total Products Sold:{' '}
              {mySales.records && mySales.records.totalProducts}
            </div>
            <div className="col-4" id="totalPrice">
              Amount Realized: &#8358;{' '}
              {mySales.records && mySales.records.amount}
            </div>
            <div className="col-3" id="totalSales">
              Number of sales: {mySales.records && mySales.records.totalSales}
            </div>
          </div>

          <div className="card col-11">
            <table className="table">
              <thead>
                <tr>
                  <th>Product Id</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Seller</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {mySales.saleDetail
                  && mySales.saleDetail.map((sale, i) => {
                    const date = new Date(sale.created_at);
                    const dateString = new Date(
                      date.getTime() - date.getTimezoneOffset() * 60000,
                    )
                      .toISOString()
                      .split('T')[0];

                    return (
                      <tr key={i}>
                        <td>{sale.productid}</td>
                        <td>{sale.productname}</td>
                        <td>{sale.quantity}</td>
                        <td>{sale.price}</td>
                        <td>{this.props.user.name}</td>
                        <td>{dateString}</td>
                      </tr>
                    );
                  })}
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
  user: state.login.user,
});
export default connect(
  mapStateToProps,
  { getPersonalSales },
)(SalesRecord);
