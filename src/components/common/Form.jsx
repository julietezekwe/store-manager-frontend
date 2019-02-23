/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addProduct,
  editProduct,
  deleteProduct,
} from '../../actions/productsAction';
import { addUser, editUser, deleteUser } from '../../actions/usersAction';
import SearchBox from './SearchBox.jsx';

export class Form extends Component {
  state = {
    productName: '',
    description: '',
    quantity: '',
    price: '',
    img: '',
    min: '',
    name: '',
    password: '',
    username: '',
    email: '',
    role: '',
  };

  componentDidMount() {
    if (this.props.id) {
      this.setState({ id: this.state.id });
    }
  }

  show = (index, id) => {
    localStorage.setItem('id', id);

    const dialog = document.querySelectorAll('dialog');
    dialog[index].showModal();
  };

  close = (index) => {
    const dialog = document.querySelectorAll('dialog');

    dialog[index].close();
  };

  submitProduct = (e) => {
    e.preventDefault();
    const payload = {
      productName: this.state.productName,
      description: this.state.description,
      quantity: this.state.quantity,
      price: this.state.price,
      image: this.state.img,
      min: this.state.min,
    };
    this.props.addProduct(payload);
  };

  updateProduct = (e) => {
    e.preventDefault();
    const id = Number(localStorage.getItem('id'));
    const payload = {
      id,
      productName: this.state.productName,
      description: this.state.description,
      quantity: this.state.quantity,
      price: this.state.price,
      image: this.state.img,
      min: this.state.min,
    };
    this.props.editProduct(payload);
  };

  deleteProduct = (e) => {
    e.preventDefault();
    const id = Number(localStorage.getItem('id'));
    this.props.deleteProduct(id);
  };

  submitUser = (e) => {
    e.preventDefault();
    const payload = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      role: this.state.role,
      email: this.state.email,
    };
    this.props.addUser(payload);
  };

  updateUser = (e) => {
    e.preventDefault();
    const id = Number(localStorage.getItem('id'));
    const payload = {
      id,
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      role: this.state.role,
      email: this.state.email,
    };
    this.props.editUser(payload);
  };

  deleteUser = (e) => {
    e.preventDefault();
    const id = Number(localStorage.getItem('id'));
    this.props.deleteUser(id);
  };

  onFormFieldChange = (event) => {
    if (event.target.id === 'image') {
      const img = document.getElementById('image').files[0];
      this.setState({ img });
    } else if (event.target.id === 'imageEdit') {
      const img = document.getElementById('imageEdit').files[0];

      this.setState({ img });
    } else {
      this.setState({
        [event.target.id]: event.target.value,
      });
    }
  };

  render() {
    const { show, close } = this;
    const { action, proId, userId } = this.props;
    const addProduct = (
      <React.Fragment>
        <div className="col-11">
          <SearchBox />
          <button onClick={() => show(0)} id="show" className="text button add">
            Add Product
          </button>
          <dialog>
            <div className="modal-content">
              <h2 className="modalHeader">Add Product</h2>
              <span
                onClick={() => close(0)}
                id="close"
                className="close-button"
              >
                &times;
              </span>
              <div className="modal-body">
                <div className="form">
                  <form className="login" id='submit-product' onSubmit={this.submitProduct}>
                    <div>
                      <input
                        id="productName"
                        type="text"
                        placeholder="Product Name"
                        required
                        onChange={this.onFormFieldChange}
                      />
                    </div>
                    <div>
                      <input
                        id="quantity"
                        type="text"
                        placeholder="Quantity"
                        required
                        onChange={this.onFormFieldChange}
                      />
                    </div>
                    <div>
                      <input
                        id="description"
                        type="text"
                        placeholder="Description"
                        required
                        onChange={this.onFormFieldChange}
                      />
                    </div>
                    <div>
                      <input
                        id="price"
                        type="text"
                        placeholder="Unit Price"
                        required
                        onChange={this.onFormFieldChange}
                      />
                    </div>
                    <div>
                      <input
                        id="min"
                        type="text"
                        placeholder="Minimun Inventory"
                        required
                        onChange={this.onFormFieldChange}
                      />
                    </div>
                    <div>
                      <select
                        name="category"
                        id="category"
                        onChange={this.onFormFieldChange}
                      >
                        category
                        <option value="">select</option>
                        <option value="flat">Flat</option>
                        <option value="hill">Hills</option>
                        <option value="casuals">Casuals</option>
                      </select>
                    </div>
                    <div>
                      <input
                        type="file"
                        id="image"
                        placeholder="Upload Image"
                        onChange={this.onFormFieldChange}
                      />
                    </div>
                    <div>
                      <input
                        type="submit"
                        value="ADD"
                        onClick={() => close(0)}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </dialog>
        </div>
      </React.Fragment>
    );

    const editProduct = (
      <React.Fragment>
        <i className="far fa-edit trigger edit" onClick={() => show(1, proId)} />
        <dialog>
          <div className="modal-content">
            <h2 className="modalHeader">Edit Product</h2>
            <span onClick={() => close(1)} id="close" className="close-button">
              &times;
            </span>
            <div className="modal-body">
              <div className="form">
                <form className="login" onSubmit={this.updateProduct}>
                  <div>
                    <input
                      id="productName"
                      type="text"
                      placeholder="Product Name"
                      required
                      onChange={this.onFormFieldChange}
                    />
                  </div>
                  <div>
                    <input
                      id="quantity"
                      type="text"
                      placeholder="Quantity"
                      required
                      onChange={this.onFormFieldChange}
                    />
                  </div>
                  <div>
                    <input
                      id="description"
                      type="text"
                      placeholder="Description"
                      required
                      onChange={this.onFormFieldChange}
                    />
                  </div>
                  <div>
                    <input
                      id="price"
                      type="text"
                      placeholder="Unit Price"
                      required
                      onChange={this.onFormFieldChange}
                    />
                  </div>
                  <div>
                    <input
                      id="min"
                      type="text"
                      placeholder="Minimun Inventory"
                      required
                      onChange={this.onFormFieldChange}
                    />
                  </div>
                  <div>
                    <select
                      name="category"
                      id="category"
                      onChange={this.onFormFieldChange}
                    >
                      category
                      <option value="">select</option>
                      <option value="flat">Flat</option>
                      <option value="hill">Hills</option>
                      <option value="casuals">Casuals</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="file"
                      id="imageEdit"
                      placeholder="Upload Image"
                      onChange={this.onFormFieldChange}
                    />
                  </div>
                  <div>
                    <input
                      type="submit"
                      value="Update"
                      onClick={() => close(1)}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </dialog>
      </React.Fragment>
    );
    const deleteProduct = (
      <React.Fragment>
        <i
          className="far fa-trash-alt trigger delete"
          onClick={() => show(2, proId)}
          id="show"
        />

        <dialog>
          <div className="modal-content">
            <span onClick={() => close(2)} id="close" className="close-button">
              &times;
            </span>
            <div className="modal-body">
              <div className="form">
                <form className="login" onSubmit={this.deleteProduct}>
                  <div className="card">
                    <div className="product-detail">
                      <h3 style={{ textAlign: 'center' }}>
                        Do you want to delete this product?
                      </h3>
                      <button
                        className="button delete-btn"
                        onClick={() => close(2)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </dialog>
      </React.Fragment>
    );

    const addUser = (
      <React.Fragment>
        <div className="col-11">
          <button onClick={() => show(0)} id="show" className="text button">
            Add User
          </button>
          <dialog>
            <div className="modal-content">
              <h2 className="modalHeader">Add User</h2>
              <span
                onClick={() => close(0)}
                id="close"
                className="close-button"
              >
                &times;
              </span>
              <div className="modal-body">
                <div className="form">
                  <form className="login" onSubmit={this.submitUser}>
                    <div>
                      <input
                        id="name"
                        type="text"
                        placeholder="Full Name"
                        required
                        onChange={this.onFormFieldChange}
                      />
                    </div>
                    <div>
                      <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        required
                        onChange={this.onFormFieldChange}
                      />
                    </div>
                    <div>
                      <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        required
                        onChange={this.onFormFieldChange}
                      />
                    </div>
                    <div>
                      <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        required
                        onChange={this.onFormFieldChange}
                      />
                    </div>
                    <div>
                      <input
                        id="role"
                        type="text"
                        placeholder="User Role"
                        required
                        onChange={this.onFormFieldChange}
                      />
                    </div>
                    <div>
                      <input
                        type="submit"
                        value="ADD"
                        onClick={() => close(0)}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </dialog>
        </div>
      </React.Fragment>
    );

    const editUser = (
      <React.Fragment>
        <i className="far fa-edit trigger editUser" onClick={() => show(1, userId)} />
        <dialog>
          <div className="modal-content">
            <h2 className="modalHeader">Edit Product</h2>
            <span onClick={() => close(1)} id="close" className="close-button">
              &times;
            </span>
            <div className="modal-body">
              <div className="form">
                <form className="login" onSubmit={this.updateUser}>
                  <div>
                    <input
                      id="name"
                      type="text"
                      placeholder="Full Name"
                      required
                      onChange={this.onFormFieldChange}
                    />
                  </div>
                  <div>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      required
                      onChange={this.onFormFieldChange}
                    />
                  </div>
                  <div>
                    <input
                      id="username"
                      type="text"
                      placeholder="Username"
                      required
                      onChange={this.onFormFieldChange}
                    />
                  </div>
                  <div>
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      required
                      onChange={this.onFormFieldChange}
                    />
                  </div>
                  <div>
                    <input
                      id="role"
                      type="text"
                      placeholder="User Role"
                      required
                      onChange={this.onFormFieldChange}
                    />
                  </div>
                  <div>
                    <input type="submit" value="ADD" onClick={() => close(1)} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </dialog>
      </React.Fragment>
    );

    const deleteUser = (
      <React.Fragment>
        <i
          className="far fa-trash-alt trigger deleteUser"
          onClick={() => show(2, userId)}
          id="show"
        />

        <dialog>
          <div className="modal-content">
            <span onClick={() => close(2)} id="close" className="close-button">
              &times;
            </span>
            <div className="modal-body">
              <div className="form">
                <form className="login" onSubmit={this.deleteUser}>
                  <div className="card">
                    <div className="product-detail">
                      <h3 style={{ textAlign: 'center' }}>
                        Do you want to delete this User?
                      </h3>
                      <button
                        className="button delete-btn"
                        onClick={() => close(2)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </dialog>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {action === 'addProduct'
          ? addProduct
          : action === 'addUser'
            ? addUser
            : action === 'deleteProduct'
              ? deleteProduct
              : action === 'eidtUser'
                ? editUser
                : action === 'deleteUser'
                  ? deleteUser
                  : action === 'editProduct'
                    ? editProduct
                    : 'button here'}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  products: state.products,
  categories: state.categories,
});
export default connect(
  mapStateToProps,
  {
    addProduct,
    editProduct,
    deleteProduct,
    addUser,
    editUser,
    deleteUser,
  },
)(Form);
