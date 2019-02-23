/* eslint-disable no-nested-ternary */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Attendant from './components/Attendant/Attendant.jsx';
import Admin from './components/Admin/Admin.jsx';

export const CommonRoutes = ({
  component: Component,
  login,
  ...rest
}) => (
    <Route
        {...rest}
        render={props => (login.isLoggedIn && login.user.role === 'admin'
          ? (
            <section id="page" className="admin-page">
                <Admin />
                <Component {...props} />
              </section>
          )
          : (login.isLoggedIn && login.user.role === 'attendant')
            ? (
            <section id="page" className="admin-page">
                <Attendant />
                <Component {...props} />
              </section>
            ) : (<Redirect to='/' />))
          }
    />
);

CommonRoutes.propTypes = {
  component: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  login: state.login,
});

export default connect(mapStateToProps)(CommonRoutes);
