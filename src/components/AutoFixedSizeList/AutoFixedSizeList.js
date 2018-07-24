import React, { Component } from 'react';
import { FixedSizeList } from 'react-window';
import _ from 'lodash';

class AutoFixedSizeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      itemHeight: props.itemHeight,
      itemCount: 0
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
    this.onWindowResize();
    window.addEventListener('resize', this.debouncedOnWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedOnWindowResize);
  }

  render() {
    const { children } = this.props;
    const { state } = this;
    return (
      <div
        className="list"
        ref={(node) => { this.ref = node }}
      >
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
}

export default AutoFixedSizeList;
