/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Routes from './Routes.jsx';
import NavBar from './components/common/NavBar.jsx';
import Footer from './components/common/Footer.jsx';


export class App extends Component {
    handleLogout = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.reload();
    }

    render() {
      const { user } = this.props.login;
      return (
            <React.Fragment>
                <NavBar user={user} logout={this.handleLogout} />
                <BrowserRouter>
                <Routes />
                </BrowserRouter>
                <Footer />
              </React.Fragment>

      );
    }
}

const mapStateToProps = state => ({
  login: state.login,
});

export default connect(mapStateToProps)(App);
