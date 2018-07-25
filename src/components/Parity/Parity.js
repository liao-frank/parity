import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { LEFT_HALF, RIGHT_HALF } from '../../utils/HalfHelper';
import { LINKS_SOCKET_URL } from '../../consts';
import {
  setHalfClass,
  fetchHalfIfNeeded,
  setSocket,
  receiveAllLinks,
  receiveAddedLinks,
  receiveDeletedLinks,
  fetchLinksIfNeeded
} from '../../store/actions';
import HalfMenu from '../HalfMenu';
import Playground from '../Playground';
import LinkMenu from '../LinkMenu';

import './Parity.css';

class Parity extends Component {
  constructor(props) {
    super(props);
    this.initSocket();
    this.initHalves(props.LeftHalf, props.RightHalf);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.socket && this.props.socket) {
      this.initLinks();
    }
  }

  render() {
    return (
      <div className="parity">
        <HalfMenu/>
        <Playground/>
        <LinkMenu/>
      </div>
    );
  }

  initHalves(LeftHalf, RightHalf) {
    this.props.setHalfClass(LEFT_HALF, LeftHalf);
    this.props.fetchHalfIfNeeded(LEFT_HALF, LeftHalf.fetch);
    this.props.setHalfClass(RIGHT_HALF, RightHalf);
    this.props.fetchHalfIfNeeded(RIGHT_HALF, RightHalf.fetch);
  }

  initLinks() {
    this.props.fetchLinksIfNeeded();
  }

  initSocket() {
    const { props } = this;
    const dispatchWithError = (error, dispatcher, data) => {
      if (error) {
        console.error(error);
      }
      else {
        dispatcher(data);
      }
    };

    const socket = io(LINKS_SOCKET_URL);
    // TODO remove this
    window.socket = socket;
    socket.on('connect', () => {
      socket.emit('index-links', {});
    });
    socket.on('index-links', (data) => {
      const { error, links } = data;
      dispatchWithError(error, props.onIndexLinks, links);
    });
    socket.on('add-link', (data) => {
      const { error, link } = data;
      dispatchWithError(error, props.onAddLink, link);
    });
    socket.on('delete-link', (data) => {
      const { error, link } = data;
      dispatchWithError(error, props.onDeleteLink, link);
    });

    props.setSocket(socket);
  }
}

const mapStateToProps = (state) => {
  return {
    socket: state.appState.socket
  };
}

export default connect(
  mapStateToProps,
  {
    onIndexLinks: receiveAllLinks,
    onAddLink: receiveAddedLinks,
    onDeleteLink: receiveDeletedLinks,
    setHalfClass,
    fetchHalfIfNeeded,
    setSocket,
    fetchLinksIfNeeded
  }
)(Parity);
