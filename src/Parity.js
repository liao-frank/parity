import React, { Component } from 'react';
import Link
import logo from './logo.svg';
import './Parity.css';

class Parity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftHalf: props.leftHalf,
      rightHalf: props.rightHalf
    };
  }

  render() {
    return (
      <div className="Parity">
        <LeftHalf
          selected={}/>
        <RightHalf
          selected={right_id}
          onSelect/>
      </div>
    );
  }

  link(leftId, rightId, callback) {
    // TODO create link and store
    callback();
  }

  onSelect(id, half) {
    if half == 'left' {
      Link.findByLeft(id, () => {

      })
    }
  }
}

export default Parity;
