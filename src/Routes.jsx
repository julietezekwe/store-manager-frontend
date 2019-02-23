import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/common/Login.jsx';
import ProductList from './components/common/ProductList.jsx';
import AllUsers from './components/Admin/AllUsers.jsx';
import AllSales from './components/Admin/AllSales.jsx';
import AdminRoutes from './AdminRoutes.jsx';
import AttendantRoutes from './AttendantRoutes.jsx';

const Routes = () => (
  <Switch >
    <Route exact path="/" default component={Login} />
    <AdminRoutes exact
      path="/admin" component={ProductList} />
    <AdminRoutes
      exact path="/admin/users" component={AllUsers} />
    <AdminRoutes
      exact path="/admin/sales" component={AllSales} />
    <AttendantRoutes exact
      path="/attendant" component={ProductList} />
  </Switch>
);

export default Routes;
