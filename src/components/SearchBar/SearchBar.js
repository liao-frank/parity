import React from 'react';

import './SearchBar.css';

const SearchBar = (props) => {
  const { onSearch, currentValue } = props;

  return (
    <div className="search-bar">
      <input
        placeholder="..."
        value={currentValue}
        onChange={(event) => {
          onSearch(event.target.value);
        }}
      />
      {
        currentValue && (
          <div
            className="icon icon-16 icon-close"
            onClick={() => { onSearch(''); }}
          ></div>
        )
      }
    </div>
  );
};

export default SearchBar;
