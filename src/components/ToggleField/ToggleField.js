import React from 'react';

import './ToggleField.css';

const ToggleField = (props) => {
  const {
    status,
    onToggle,
    label,
    align
  } = props;

  return (
    <div className="toggle-field">
      <div className="flex-row">
        <div
          className={'toggle' + (status ? ' toggled' : '')}
          onClick={onToggle}
        ></div>
        <p className={(align || 'left') + '-align'}>{label}</p>
      </div>
    </div>
  );
};

export default ToggleField;
