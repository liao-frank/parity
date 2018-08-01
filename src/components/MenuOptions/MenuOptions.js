import React from 'react';

import './MenuOptions.css';

const MenuOptions = (props) => {

  return (
    <div className="menu-options">
      { props.children }
    </div>
  );
};

export default MenuOptions;
