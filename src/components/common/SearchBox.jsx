import React from 'react';

const SearchBox = () => (
    <React.Fragment>
      <p className="text-left">
        Search by
        <select name="category" id="">
          <option value="all">All</option>
          <option value="Slippers">Flat</option>
          <option value="Shoes">Shoes</option>
        </select>
      </p>
    </React.Fragment>
);

export default SearchBox;
