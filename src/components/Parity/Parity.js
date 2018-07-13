import React, { Component } from 'react';
import './Parity.css';

class Parity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftHalf: props.leftHalf,
      rightHalf: props.rightHalf,
      orientation: 'normal', // 'normal' or 'reverse'
      maxHalfSize: props.maxHalfSize || 0
    };
  }

  render() {
    return (
      <div className="parity">
        <div className="cover">
          <div className="logo logo-parity"></div>
        </div>
        {/* <LeftHalf
          selected={}/>
        <RightHalf
          selected={right_id}
          onSelect/> */}
      </div>
    );
  }

  link(leftId, rightId, callback) {
    // TODO create link and store
    callback();
  }

  onSelect(half, id) {
    // if half == 'left' {
    //   Link.findByLeft(id, () => {
    //
    //   })
    // }
  }
}

export default Parity;
