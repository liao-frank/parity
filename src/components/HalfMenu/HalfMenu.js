import React, { Component } from 'react';
import { connect } from 'react-redux';
import HalfList from '../HalfList';
import HalfMenuOptions from '../HalfMenuOptions';
import {
  invalidateHalf,
  fetchHalfIfNeeded,
  toggleShowingHalf
} from '../../store/actions';

import './HalfMenu.css';

export class HalfMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.showingHalf !== this.props.showingHalf) {
      this.fetch();
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { halfState, links } = props;
    return {
      halfState,
      links
    };
  }

  render() {
    const {
      invalidateHalf,
      toggleShowingHalf,
      fetchHalfIfNeeded,
      showingHalf,
      halfState } = this.props;
    const { links } = this.state;
    const { halfClass } = halfState[showingHalf];
    return (
      <div
        className={showingHalf + ' half-menu panel'}
      >
        <h1 className="header ellipsis-overflow">
          {halfClass.title}
        </h1>
        <HalfList
          showingHalf={showingHalf}
          halfState={halfState}
          links={links}
        />
        <HalfMenuOptions
          showingHalf={showingHalf}
          halfState={halfState}
          dispatchers={{
            invalidateHalf,
            toggleShowingHalf,
            fetchHalfIfNeeded
          }}
        />
      </div>
    );
  }

  fetch() {
    const {
      showingHalf,
      halfState,
      fetchHalfIfNeeded
    } = this.props;
    // invalidateHalf(showingHalf);
    fetchHalfIfNeeded(showingHalf, halfState[showingHalf].halfClass.fetch);
  }
}

const mapStateToProps = (state) => {
  const { appState, halfState, linkState } = state;
  return {
    showingHalf: appState.showingHalf,
    halfState: halfState,
    links: linkState.links
  };
};

export default connect(
  mapStateToProps,
  {
    invalidateHalf,
    fetchHalfIfNeeded,
    toggleShowingHalf
  }
)(HalfMenu);
