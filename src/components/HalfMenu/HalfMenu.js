import React, { Component } from 'react';
import { connect } from 'react-redux';
import HalfList from '../HalfList';
import {
  invalidateHalf,
  fetchHalfIfNeeded
} from '../../store/actions';

import './HalfMenu.css';

export class HalfMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fetch();
  }

  static getDerivedStateFromProps(props, state) {
    const { halfState, links } = props;
    const { class: halfClass } = halfState;
    let title;
    if (halfClass.title && typeof halfClass.title === 'string') {
      title = halfClass.title;
    }
    else {
      title = halfClass.name.match(/(\w*)Half/)[1];
    }
    return {
      title,
      links
    };
  }

  render() {
    const { showingHalf, halfState } = this.props;
    const { title, links } = this.state;
    return (
      <div
        className={showingHalf + ' half-menu panel'}
      >
        <h1 className="header">{title}</h1>
        <HalfList
          half={showingHalf}
          items={halfState.items}
          links={links}
        />
      </div>
    );
  }

  fetch() {
    const {
      showingHalf,
      halfState,
      fetchHalfIfNeeded,
      invalidateHalf
    } = this.props;
    invalidateHalf(showingHalf);
    fetchHalfIfNeeded(showingHalf, halfState.class.fetch);
  }
}

const mapStateToProps = (state) => {
  const { appState, halfState, linkState } = state;
  return {
    showingHalf: appState.showingHalf,
    halfState: halfState[appState.showingHalf],
    links: linkState.links
  };
};

export default connect(
  mapStateToProps,
  {
    invalidateHalf,
    fetchHalfIfNeeded
  }
)(HalfMenu);
