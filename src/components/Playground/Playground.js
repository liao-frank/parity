import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOtherHalf } from '../../utils/HalfHelper';
import { toggleLinkPanel } from '../../store/actions';
import PlaygroundItem from '../PlaygroundItem';

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
          window.Velocity(this.playgroundRef,
            {
              scrollTop: `${this.playgroundRef.offsetHeight}px`
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
      showingItem,
      showingRenderer,
      linkedItems,
      linkedRenderer,
      showingLinkPanel,
      onOpenLinkPanel
    } = this.props;

    const linkedContent = !linkedItems.length ?
      (
        <p>Nothing.</p>
      ) :
      (
        linkedItems.map((item) => {
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
  }
}

// const Playground = (props) => {
//   const {
//     showingItem,
//     showingRenderer,
//     linkedItems,
//     linkedRenderer,
//     showingLinkPanel,
//     onOpenLinkPanel
//   } = props;
//
//   const linkedContent = !linkedItems.length ?
//     (
//       <p>Nothing.</p>
//     ) :
//     (
//       linkedItems.map(item => {
//           return (
//             <PlaygroundItem
//               key={item._parityId}
//               item={item}
//               renderer={linkedRenderer}
//             />
//           );
//       })
//     );
//
//   return (
//     (showingItem && Object.keys(showingItem).length !== 0) ?
//     (
//       <div className="playground panel">
//         <div
//           className={
//             'icon icon-16 icon-edit' + (!showingLinkPanel ? ' active' : '')
//           }
//           onClick={onOpenLinkPanel}
//         ></div>
//         <h1 className="header">Item</h1>
//         <PlaygroundItem item={showingItem} renderer={showingRenderer}/>
//         <h1 className="header">Linked To</h1>
//         { linkedContent }
//       </div>
//     ) :
//     (
//       <div className="playground panel">
//         <div className="logo logo-parity"></div>
//       </div>
//     )
//   );
// };

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
