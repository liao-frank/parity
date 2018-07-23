import React from 'react';
import { connect } from 'react-redux';

import './Playground.css';

const Playground = (props) => {
  const {
    showingItem,
    showingRenderer,
    linkedItems,
    linkedRenderer
  } = props;

  const linkedContent = !linkedItems.length ?
    (
      <p>Nothing.</p>
    ) :
    (
      linkedItems.map(item => {
          return <div key={item._parityId}>{linkedRenderer(item)}</div>;
      })
    );

  return (
    (showingItem && Object.keys(showingItem).length !== 0) ?
    (
      <div className="playground panel">
        <h1 className="header">Item</h1>
        { showingRenderer(showingItem) }
        <br/>
        <h1 className="header">Linked To</h1>
        { linkedContent }
      </div>
    ) :
    (
      <div className="cover panel">
        <div className="logo logo-parity"></div>
      </div>
    )
  );
};

const mapStateToProps = (state) => {
  const { appState, halfState, linkState } = state;
  const { showingHalf, showingItem } = appState;
  const otherHalf = showingHalf === 'left' ? 'right' : 'left';
  const linkMap = linkState.links.getLinks(showingHalf, showingItem._parityId);

  const showingRenderer = halfState[showingHalf].halfClass.renderItem;
  const linkedItems = Object.keys(linkMap).map((otherHalfId) => {
    return {
      ...halfState[otherHalf].items[otherHalfId],
      _parityId: otherHalfId
    };
  });
  const linkedRenderer = halfState[otherHalf].halfClass.renderItem;
  return {
    showingItem,
    showingRenderer,
    linkedItems,
    linkedRenderer
  };
};

export default connect(mapStateToProps)(Playground);
