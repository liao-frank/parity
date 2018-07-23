import React from 'react';

import './ToggleField.css';

const ToggleField = (props) => {
  const {
    status,
    onToggle,
    label
  } = props;

  return (
    <div className="toggle-field">
      <div
        className={'toggle' + (status ? ' toggled' : '')}
        onClick={onToggle}
      ></div>
      <p>{label}</p>
    </div>
  );
};

export default ToggleField;
