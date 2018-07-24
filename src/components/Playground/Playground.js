import React from 'react';
import { connect } from 'react-redux';
import { toggleLinkPanel } from '../../store/actions';
import PlaygroundItem from '../PlaygroundItem';

import './Playground.css';

const Playground = (props) => {
  const {
    showingItem,
    showingRenderer,
    linkedItems,
    linkedRenderer,
    showingLinkPanel,
    onOpenLinkPanel
  } = props;

  const linkedContent = !linkedItems.length ?
    (
      <p>Nothing.</p>
    ) :
    (
      linkedItems.map(item => {
          return (
            <PlaygroundItem
              key={item._parityId}
              item={item}
              renderer={linkedRenderer}
            />
          );
      })
    );

  return (
    (showingItem && Object.keys(showingItem).length !== 0) ?
    (
      <div className="playground panel">
        <div
          className={
            'icon icon-16 icon-edit' + (!showingLinkPanel ? ' active' : '')
          }
          onClick={onOpenLinkPanel}
        ></div>
        <h1 className="header">Item</h1>
        <PlaygroundItem item={showingItem} renderer={showingRenderer}/>
        <h1 className="header">Linked To</h1>
        { linkedContent }
      </div>
    ) :
    (
      <div className="playground panel">
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
    linkedRenderer,
    showingLinkPanel: appState.linkPanel
  };
};

export default connect(mapStateToProps, {
  onOpenLinkPanel: toggleLinkPanel
})(Playground);
