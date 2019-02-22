import React from 'react';

const Admin = () => (
        <div className="dashboard myCard col-2">
          <h3> Dashboard</h3>
          <p className="active"><a href="/admin/">Products</a></p>
          <hr />
          <p className="active"><a href="/admin/sales">Sales Records</a></p>
          <hr />
          <p className="active"><a href='/admin/users'>Users</a></p>
        </div>
);

export default Admin;
