import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Attendant from './components/Attendant/Attendant.jsx';

export const AttendantRoutes = ({
  component: Component,
  login,
  ...rest
}) => (
  <Switch>
    <Route
        {...rest}
        render={props => (login.isLoggedIn && login.user.role === 'attendant'
          ? (
            <section id="page" className="admin-page">
                <Attendant />
                <Component {...props} />
              </section>
          )
          : (<Redirect to='/' />))}
    />
    </Switch>
);

AttendantRoutes.propTypes = {
  component: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  login: state.login,
});

export default connect(mapStateToProps)(AttendantRoutes);
