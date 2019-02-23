import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAproduct } from '../../actions/productsAction';

export class ProductDetail extends Component {
  async componentDidMount() {
    await this.props.getAproduct(Number(this.props.match.params.id));
  }

  render() {
    const { productDetail } = this.props;
    return (
      <div className=" description">
        <div className="col-5 " style={{ marginTop: '30px' }}>
          <img src={productDetail && productDetail.image} alt="Products" />
        </div>
        <br />
        <h2>{productDetail && productDetail.productname}</h2>
        <h3>
          {' '}
          Description: <p>{productDetail && productDetail.description}</p>{' '}
        </h3>
        <br />
        <h3>
          Stock : <p> {productDetail && productDetail.quantity} </p>
        </h3>{' '}
        <br />
        <h3>
          Price : <p>{productDetail && productDetail.price}</p>{' '}
        </h3>{' '}
        <br />
        <h3>
          minimum inventory quantity : <p>{productDetail && productDetail.min}</p>{' '}
        </h3>{' '}
        <br />
        <h3>
          Creation Date : <p>{productDetail && productDetail.created_at}</p>{' '}
        </h3>{' '}
        <br />
        <h3>
          Category : <p>{productDetail && productDetail.category}</p>{' '}
        </h3>{' '}
        <br />
        <h3>Features</h3>
        <p>Long Lasting, </p>
        <p>Durable, </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  productDetail: state.products.productDetail[0],
});
export default connect(mapStateToProps, { getAproduct })(ProductDetail);
