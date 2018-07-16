import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import {
  storeSocket,
  receiveAllLinks,
  receiveAddedLinks,
  receiveDeletedLinks,
  fetchLinksIfNeeded
} from '../../store/actions';

import './Parity.css';

class Parity extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.state = {
      LeftHalf: props.LeftHalf,
      RightHalf: props.RightHalf
    };
    // TODO put this URL away somewhere as a constant
    const socket = io('http://localhost:6007');
    // TODO remove this
    window.socket = socket;
    this.setEvents(socket);
    dispatch(storeSocket(socket));
  }

  componentDidUpdate(prevProps) {
    const { dispatch } = this.props;
    dispatch(fetchLinksIfNeeded());
  }

  render() {
    const { LeftHalf, RightHalf } = this.state;
    return (
      <div className="parity">
        <div className="cover">
          <div className="logo logo-parity"></div>
        </div>
        <LeftHalf
          half="left"
        />
        <RightHalf
          half="right"
        />
      </div>
    );
  }

  onSelect(half, id) {
    // if half == 'left' {
    //   Link.findByLeft(id, () => {
    //
    //   })
    // }
  }

  setEvents(socket) {
    const { dispatch } = this.props;
    const dispatchWithError = (error, action) => {
      if (error) {
        console.error(error);
      }
      else {
        dispatch(action);
      }
    };

    socket.on('index-links', (data) => {
      const { error, links } = data;
      dispatchWithError(error, receiveAllLinks(links));
    });
    socket.on('add-link', (data) => {
      const { error, link } = data;
      dispatchWithError(error, receiveAddedLinks(link));
    });
    socket.on('delete-link', (data) => {
      const { error, link } = data;
      dispatchWithError(error, receiveDeletedLinks(link));
    });
  }
}

const mapStateToProps = (state) => {
  return {
    socket: state.appState.socket
  };
}

export default connect(mapStateToProps)(Parity);
