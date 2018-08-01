import React from 'react';

import './MenuOptionsItem.css';

const MenuOptionsItem = (props) => {
  const { onClick } = props;

  return (
    <div
      className="menu-options-item ellipsis-overflow"
      onClick={onClick}
    >
      { props.children }
    </div>
  );
};

export default MenuOptionsItem;
