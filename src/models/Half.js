import React from 'react';

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
class Half {
  /**
   * A method that handles item rendering when items are selected within their
   * panels.
   * @return {[type]} [description]
   */
  static renderItem(item) {
    return (
      <div>
        { JSON.stringify(item) }
      </div>
    );
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
  static init(callback) {

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
}

export default Half;
