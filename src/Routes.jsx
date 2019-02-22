import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/common/Login.jsx';
import ProductList from './components/common/ProductList.jsx';
import AdminRoutes from './AdminRoutes.jsx';
import AttendantRoutes from './AttendantRoutes.jsx';

const Routes = () => (
  <Switch >
    <Route exact path="/" default component={Login} />
    <AdminRoutes exact
      path="/admin" component={ProductList} />
    <AttendantRoutes exact
      path="/attendant" component={ProductList} />
  </Switch>
);

export default Routes;
