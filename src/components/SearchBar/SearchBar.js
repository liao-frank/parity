import React from 'react';

import './SearchBar.css';

const SearchBar = (props) => {
  const { onSearch } = props;

  return (
    <input
      className="search-bar"
      placeholder="..."
      onChange={(event) => {
        onSearch(event.target.value);
      }}
    />
  );
};

export default SearchBar;
