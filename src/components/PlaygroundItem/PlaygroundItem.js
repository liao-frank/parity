import React, { PureComponent } from 'react';

import './PlaygroundItem.css';

class PlaygroundItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  componentDidUpdate(prevProps) {
    const { item } = this.props;
    if (item !== prevProps.item) {
      this.setState({ hasError: false });
    }
  }

  componentDidCatch(err, info) {
    this.setState({ hasError: true });
    console.log(err, info);
  }

  renderItem() {
    const { item, renderer } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <p>Error occurred while rendering.</p>
      );
    }

    const validItem = item && Object.keys(item).length > 1;
    return validItem ? (
      renderer(item)
    ) : (
      <p>No item data available right now.</p>
    );
  }

  render() {
    const { item, renderer } = this.props;

    const itemRender = renderer ? (
      <div className="playground-item-render">
        { this.renderItem() }
      </div>
    ) : null;

    return (
      <div
        className={'playground-item' + (renderer ? '' : ' no-render')}
      >
        <h3 className="header">
          { item._parityName || item._parityId }
        </h3>
          { itemRender }
      </div>
    );
  }
}

export default PlaygroundItem;
