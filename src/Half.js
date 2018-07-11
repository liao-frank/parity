import React, { Component } from 'react';

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
class Half extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      half: props.half,
      items: {}
    }
  }

  render() {
    const {title, half, items} = this.state;
    return (
      <div
        className={half + 'half'}
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
   * @param  {Function} callback async data handler, accepts (items)
   * @return {Object}            OPTIONAL items
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
   * @param  {Function} callback async data handler, accepts (items)
   * @return {Object}            OPTIONAL items
   */
  // refresh(callback) {
  //
  // }

  _init(callback) {
    const items = this.init((items) => {
      if (items) {
        this._onInit(items);
        callback(items);
      }
      else {
        throw 'Async `init` handler was used, but no data was passed.';
      }
    });
    if (items) {
      // TODO
      callback(items);
    }
  }

  _onInit(items) {
    this._setItems(items);
  }

  _refresh(callback) {
    const items = this.refresh((items) => {
      if (items) {
        this._onRefresh(items);
        callback(items);
      }
      else {
        throw 'Async `refresh` handler was used, but no data was passed';
      }
    });
    if (items) {
      callback(items);
    }
  }

  _onRefresh(items) {
    this._setItems(item);
  }

  _setItems(items) {
    this.setState({
      items
    });
  }

  _hasCategories() {

  }
}

export default Half;
