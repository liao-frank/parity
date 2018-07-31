import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOtherHalf } from '../../utils/HalfHelper';
import { toggleLinkPanel, toggleRenderItems } from '../../store/actions';
import PlaygroundItem from '../PlaygroundItem';
import ToggleField from '../ToggleField';

import './Playground.css';

class Playground extends Component {
  componentDidUpdate(prevProps) {
    const {
      showingItem: prevShowingItem,
      linkedItems: prevLinkedItems
    } = prevProps;
    const { showingItem, linkedItems } = this.props;

    if (prevShowingItem._parityId === showingItem._parityId) {
      if (linkedItems.length - prevLinkedItems.length === 1) {
        if (this.playgroundRef) {
          const lastChild = this.playgroundRef.lastChild;
          window.Velocity(this.playgroundRef,
            {
              scrollTop: `${lastChild.offsetHeight + lastChild.offsetTop}px`
            },
            {
              duration: 150,
              easing: 'easeInOutSine'
            }
          );
        }
      }
    }
  }

  render() {
    const {
      showingItem, showingRenderer, showingHalfTitle,
      otherHalfTitle,
      linkedItems, linkedRenderer,
      showingLinkPanel, renderingItems,
      onOpenLinkPanel, onToggleRenderItems
    } = this.props;

    const linkedContent = !linkedItems.length ?
      (
        <PlaygroundItem
          item={{ _parityName: 'Nothing.' }}
        />
      ) :
      (
        linkedItems.map((item) => {
            return (
              <PlaygroundItem
                key={item._parityId}
                item={item}
                renderer={renderingItems && linkedRenderer}
              />
            );
        })
      );

    return (
      (showingItem && Object.keys(showingItem).length !== 0) ?
      (
        <div
          className="playground panel"
          ref={(node) => { this.playgroundRef = node }}
        >
          <div
            className={
              'icon icon-16 icon-edit' + (!showingLinkPanel ? ' active' : '')
            }
            onClick={onOpenLinkPanel}
          ></div>
          <h1 className="header">{showingHalfTitle} Item</h1>
          <PlaygroundItem
            item={showingItem}
            renderer={showingRenderer}
            key={showingItem._parityId}
          />
          <h1 className="header">Linked To</h1>

          <ToggleField
            status={renderingItems}
            label={`Render ${otherHalfTitle} items`}
            onToggle={onToggleRenderItems}
          />
          { linkedContent }
        </div>
      ) :
      (
        <div className="playground panel">
          <div className="logo logo-parity"></div>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => {
  const { appState, halfState, linkState } = state;
  const { showingHalf, showingItem } = appState;
  const otherHalf = getOtherHalf(showingHalf);
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
    showingHalfTitle: halfState[showingHalf].halfClass.title,
    showingItem,
    showingRenderer,
    otherHalfTitle: halfState[otherHalf].halfClass.title,
    linkedItems,
    linkedRenderer,
    showingLinkPanel: appState.linkPanel,
    renderingItems: appState.renderItems
  };
};

export default connect(mapStateToProps, {
  onOpenLinkPanel: toggleLinkPanel,
  onToggleRenderItems: toggleRenderItems
})(Playground);
