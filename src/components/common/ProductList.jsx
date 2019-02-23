import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from './Form.jsx';
import { getAllProducts } from '../../actions/productsAction';
import SearchBox from './SearchBox.jsx';

export class ProductList extends Component {
  componentDidMount() {
    this.props.getAllProducts();
  }

  handleAddToCart = (id) => {
    if (JSON.parse(localStorage.getItem(`${this.props.login.user.id}`))) {
      const carts = JSON.parse(
        localStorage.getItem(`${this.props.login.user.id}`),
      );
      if (carts.cartNo.indexOf(id) === -1) {
        carts.cartNo.push(id);
        const cartContent = JSON.stringify(carts);
        localStorage.setItem(`${this.props.login.user.id}`, cartContent);
        const cartCount = carts.cartNo.length;
        localStorage.setItem('cartCount', cartCount);
        window.location.reload();
      }
    }
  };

  render() {
    const { products } = this.props;
    const { user } = this.props.login;

    return (
      <React.Fragment>
        <div className="col-8">
          {user.role === 'admin' ? (
            <Form action="addProduct" />
          ) : (
            <React.Fragment>
              <div className="col-11">
                <SearchBox />
              </div>
            </React.Fragment>
          )}
          {products
            && products.map(product => (
              <div className="myCard col-3" key={product.id}>
                {product.quantity < 1 ? (
                  <div className="ribbon ribbon-top-left">
                    <span style={{ background: 'red' }}>
                      {' '}
                      &nbsp; &nbsp; Out of stock
                    </span>
                  </div>
                ) : (
                  <div className="ribbon ribbon-top-left">
                    <span> &nbsp; &nbsp; In Stock ({product.quantity})</span>
                  </div>
                )}

                <img src={product.image} alt="Avatar" />
                <div className="product-detail">
                  <h3 style={{ textAlign: 'center' }}>
                    <a href={`/products/${product.id}`}>
                      {product.productname}
                    </a>{' '}
                  </h3>
                  <p className="text-left">
                    <i className="fas fa-dollar-sign" /> {product.price}
                  </p>
                  <div className="text">
                    {user.role === 'admin' ? (
                      <React.Fragment>
                        <Form action="editProduct" proId={product.id} />
                        <Form action="deleteProduct" proId={product.id} />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <button
                          id="cart"
                          disabled={product.quantity < 1}
                          onClick={() => this.handleAddToCart(product.id)}
                        >
                          <i className="fas fa-shopping-cart trigger" />
                        </button>
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  login: state.login,
  products: state.products.products,
});
export default connect(
  mapStateToProps,
  {
    getAllProducts,
  },
)(ProductList);
