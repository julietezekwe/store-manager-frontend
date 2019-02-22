import React from 'react';

const Attendant = () => (
      <React.Fragment>

        <div className="dashboard myCard col-2">
          <h3> Dashboard</h3>
          <p className="active"><a href="/attendant/">Products</a></p>
          <hr />
          <p className="active"><a href="/attendant/sales">Sales Records</a></p>

        </div>
      </React.Fragment>
);

export default Attendant;
