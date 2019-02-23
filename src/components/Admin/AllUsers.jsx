import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../common/Form.jsx';
import { getAllUsers } from '../../actions/usersAction';

export class AllUsers extends Component {
  async componentDidMount() {
    await this.props.getAllUsers();
  }

  render() {
    const { users, isLoadingUsers } = this.props.login;

    return (
      <React.Fragment>
        <div className="col-8">
          <Form action="addUser" />
          <div className="card col-11">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {!isLoadingUsers
                  && users.UsersModel.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <Form action="eidtUser" userId={user.id} /> &nbsp;
                        &nbsp;
                        <Form action="deleteUser" userId={user.id} />
                      </td>
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
  login: state.login,
  users: state.login.users,
});
export default connect(
  mapStateToProps,
  { getAllUsers },
)(AllUsers);
