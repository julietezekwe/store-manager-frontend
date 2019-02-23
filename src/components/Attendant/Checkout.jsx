/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllCartProducts, handleCheckout } from '../../actions/salesAction';

export class Checkout extends Component {
  state = { totalPrice: 0 };

  async componentDidMount() {
    if (JSON.parse(localStorage.getItem(`${this.props.login.user.id}`))) {
      const carts = JSON.parse(
        localStorage.getItem(`${this.props.login.user.id}`),
      );
      await this.props.getAllCartProducts(carts.cartNo);
    }
  }

  handleRemoveFromCart = (id) => {
    const carts = JSON.parse(
      localStorage.getItem(`${this.props.login.user.id}`),
    );

    for (let i = 0; i < carts.cartNo.length; i += 1) {
      if (Number(carts.cartNo[i]) === Number(id)) {
        carts.cartNo.splice(i, 1);
      }
    }
    const cartContent = JSON.stringify(carts);
    localStorage.setItem(`${this.props.login.user.id}`, cartContent);
    localStorage.setItem('cartCount', carts.cartNo.length);
    window.location.reload();
  };

  onQuantityChange = (quantity, id, price) => {
    if (quantity < 1 || isNaN(quantity)) quantity = 0;
    document.getElementById(`Q${id}`).innerHTML = quantity;
    const currentPrice = document.getElementById(`${id}`).innerHTML;
    const newPrice = quantity * price;

    document.getElementById(`${id}`).innerHTML = newPrice;
    let totalPrice = Number(document.getElementById('totalPrice').innerHTML);
    totalPrice = totalPrice - currentPrice + newPrice;
    this.setState({ totalPrice });
  };

  render() {
    const { cart } = this.props.sales;

    return (
      <div className="col-8">
        <div
          className="card col-12"
          style={{
            float: 'none',
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '35px',
          }}
        >
          <div className="card col-9" id="alert" />
          <table className="table" style={{ width: '100%' }} id="checkout">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>ID</th>
                <th />
                <th>Quantity</th>
                <th>Amount (&#8358;)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart
                && cart.cartProductDetails.map(product => (
                    <tr key={product[0].id}>
                      <td>{product[0].id}</td>
                      <td>{product[0].productname}</td>
                      <td>{product[0].description}</td>
                      <td>{product[0].id}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          style={{ textAlign: 'center', width: '50px' }}
                          onChange={e => this.onQuantityChange(
                            e.target.value,
                            product[0].id,
                            product[0].price,
                          )
                          }
                        />{' '}
                      </td>
                      <td id={`Q${product[0].id}`}>1</td>
                      <td id={product[0].id}>{product[0].price}</td>
                      <td>
                        <i
                          className="far fa-trash-alt trigger"
                          onClick={() => this.handleRemoveFromCart(product[0].id)
                          }
                        />
                      </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5" />
                <td>Total Price </td>
                <td id="totalPrice">
                  {this.state.totalPrice !== 0
                    ? this.state.totalPrice
                    : cart.totalPrice}
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button
                    className="button"
                    onClick={() => this.props.handleCheckout(this.props.login.user.id)
                    }
                  >
                    Checkout Now
                  </button>
                </td>
                <td colSpan="4" />
                <td colSpan="2" />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login,
  sales: state.sales,
});
export default connect(
  mapStateToProps,
  { getAllCartProducts, handleCheckout },
)(Checkout);
