import React from 'react';
import { connect } from 'react-redux';

import './HalfListItem.css';

const HalfListItem = (props) => {
  const { item, links } = props;
  const linkCount = Object.keys(links).length;
  return (
    <li className="half-item">
      { item._parityName  || item._parityId }
      <span className="link-count">
        <span className="icon icon-12 icon-link"></span>
        { linkCount === 1 ? '' : linkCount }
      </span>
    </li>
  );
};

const mapStateToProps = (state) => {
  const { linkState } = state;
  return {
    linkState
  };
};

export default connect(mapStateToProps)(HalfListItem);
