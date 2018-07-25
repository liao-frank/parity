import React, { Component } from 'react';
import { FixedSizeList } from 'react-window';
import _ from 'lodash';

const testItemStyle = {
  position: 'absolute',
  zIndex: '-1',
  visibility: 'hidden'
};


/**
 * Manages a vertical instance of `FixedSizeList` from `react-window`.
 * Manages list height and discovers item height on mount.
 * @extends Component
 */
class AutoFixedSizeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      itemHeight: 0,
      itemCount: 0,
      testingItemHeight: true
    }
    this.onWindowResize = this.onWindowResize.bind(this);
    this.debouncedOnWindowResize = _.debounce(
      this.onWindowResize,
      100
    );
  }

  static getDerivedStateFromProps(props) {
    const { children } = props;
    return {
      itemCount: children.length
    };
  }

  componentDidMount() {
    if (this.props.children.length) {
      this.onWindowResize();
      this.getItemHeight();
      window.addEventListener('resize', this.debouncedOnWindowResize);
    }
  }

  componentWillUnmount() {
    if (this.props.children.length) {
      window.removeEventListener('resize', this.debouncedOnWindowResize);
    }
  }

  render() {
    const { children, className } = this.props;
    const { state } = this;
    return (
      <div
        className={className}
        ref={(node) => { this.ref = node }}
      >
        { state.testingItemHeight &&
          <div
            style={testItemStyle}
            ref={(node) => { this.itemRef = node }}
          >
            {children[0]}
          </div>
        }
        <FixedSizeList
          height={state.height}
          itemCount={state.itemCount}
          itemSize={state.itemHeight}
          width={'100%'}
        >
          {
            ({ index, style }) => {
              return <div style={style}>
                { children[index] }
              </div>;
            }
          }
        </FixedSizeList>
      </div>
    );
  }

  onWindowResize() {
    const { ref } = this;
    this.setState({
      height: ref.offsetHeight
    });
  }

  getItemHeight() {
    const { itemRef } = this;
    this.setState({
      itemHeight: itemRef.offsetHeight,
      testingItemHeight: false
    });
  }
}

export default AutoFixedSizeList;
