import React, { Component } from 'react';
import { connect as reduxConnect } from 'react-redux';
import {
  invalidateHalf,
  fetchHalfIfNeeded
} from '../../store/actions';

/**
 * An interface for writing a Half of Parity. This interface includes
 * documentation about methods that should be implemented by subclasses to
 * control custom data flow.
 *
 * `init()` MUST be implemented, as it makes no sense to not have data.
 * No other default method implementations exist. If methods are not implemented
 * by the subclass, then those features will simply not exist for the user.
 * @extends Component
 */
export class Half extends Component {
  constructor(props) {
    super(props);
    if (!['left', 'right'].includes(props.half)) {
      throw new Error(`Invalid half specified: ${props.half}`);
    }
    this.state = {
      title: props.title,
      items: {},
      didInvalidate: false,
      isFetching: false,
      lastUpdated: null
    }
    this._init();
  }

  static getDerivedStateFromProps(props, state) {
    const { half, halfState } = props;
    return {
      ...halfState[half]
    };
  }

  render() {
    const { half } = this.props;
    const { title, items } = this.state;
    return (
      <div
        className={half + ' half'}
      >
        <h1>{title}</h1>
        <p>{JSON.stringify(items)}</p>
      </div>
    );
  }

  /**
   * A method that handles item rendering when items are selected within their
   * panels.
   * @return {[type]} [description]
   */
  renderItem(item) {

  }

  /**
   * A method that handles initial data population and is called on mount. This
   * method must be implemented by the subclass.
   *
   * Supports both async and sync data retrieval. Use return value for sync
   * actions, and use provided callback for async actions.
   * DO NOT USE BOTH. Both processes will overwrite previous items, so the sync
   * data population will always be overwritten.
   * @param  {Function} callback async data handler, accepts (err, items)
   * @return {Array}            OPTIONAL [err, items]
   */
  init(callback) {

  }

  /**
   * A method that handles refreshing of data. It is the responsibility of the
   * subclass to implement this method. If not implemented, the refresh feature
   * will simply not exist.
   *
   * Supports both async and sync data retrieval. Use return value for sync
   * actions, and use provided callback for async actions.
   * USING BOTH IS NOT SUPPORTED.
   * @param  {Function} callback async data handler, accepts (err, items)
   * @return {Object}            OPTIONAL items
   */
  // refresh(callback) {
  //
  // }

  _init(callback) {
    const { half, dispatch } = this.props;
    dispatch(fetchHalfIfNeeded(half, this.init));
  }

  _refresh(callback) {
    const { half, dispatch } = this.props;
    dispatch(invalidateHalf(half));
    dispatch(fetchHalfIfNeeded(half, this.refresh));
  }

  // _hasCategories() {
  //
  // }
}

const mapStateToProps = (state) => {
  const { halfState } = state;
  return {
    halfState
  };
};

export const connect = (Component) => {
    return reduxConnect(mapStateToProps)(Component);
};
