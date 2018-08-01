import React from 'react';
import { connect } from 'react-redux';
import { itemMapToList, filterItemList } from '../../utils/ItemHelper';
import SearchBar from '../SearchBar';
import ItemList from '../ItemList';
import ItemListItem from '../ItemListItem';
import ToggleField from '../ToggleField';
import LinkMenuOptions from '../LinkMenuOptions';
import { getOtherHalf, LEFT_HALF } from '../../utils/HalfHelper';
import {
  setLinkFilter,
  toggleActiveLinksOnly,
  toggleLinkPanel
} from '../../store/actions';

import './LinkMenu.css';

const LinkMenu = (props) => {
  const {
    linkModel,
    searchFilter,
    active, onSearch, onClose,
    toggleActiveLinksOnly, activeLinksOnly,
    halfState
  } = props;

  return (
    <div className={
      'menu link-menu panel' + (active ? ' active' : '')
    }>
      <div className="menu">
        <h1 className="header">Links</h1>
        <div
          className="icon icon-24 icon-right-arrow"
          onClick={onClose}
        ></div>
        <div className="search-wrapper">
          <SearchBar onSearch={onSearch} currentValue={searchFilter}/>
        </div>
        <br/>
        <ToggleField
          status={activeLinksOnly}
          onToggle={toggleActiveLinksOnly}
          label="Show Active Links Only"
          align="right"
        />
        { renderItemList(props) }
      <LinkMenuOptions
        linkModel={linkModel}
        halfState={halfState}
      />
      </div>
    </div>
  );
};

const renderItemList = (props) => {
  const {
    showingHalf, showingItem, showingLinkMap,
    itemMap,
    searchFilter, activeLinksOnly,
    isFetching,
    socket
  } = props;
  const isShowingItem = showingItem && Object.keys(showingItem).length !== 0;

  return (
    <ItemList
      items={
        isShowingItem ?
        processItems(itemMap, searchFilter, activeLinksOnly && showingLinkMap) :
        []
      }
      isFetching={isFetching}
      generateListItem={(item) => {
        const linked = item._parityId in showingLinkMap;
        return (
          <ItemListItem
            key={item._parityId}
            item={item}
            selectable={isShowingItem}
            onSelect={() => {
              const link = generateLink(showingHalf, showingItem, item);
              if (linked && showingItem) {
                socket.emit('delete-link', { link });
              }
              else if (showingItem) {
                socket.emit('add-link', { link });
              }
            }}
            isSelected={linked}
            accent={
              <span className="icon icon-checkmark"></span>
            }
          />
        );
      }}
    />
  );
}

const generateLink = (showingHalf, showingItem, otherItem) => {
  return showingHalf === LEFT_HALF ? {
    leftId: showingItem._parityId,
    rightId: otherItem._parityId
  } : {
    leftId: otherItem._parityId,
    rightId: showingItem._parityId
  };
};

const processItems = (itemMap, searchFilter, showingLinkMap) => {
  let itemList = itemMapToList(itemMap);
  if (showingLinkMap) {
    itemList = itemList.filter(item => item._parityId in showingLinkMap);
  }
  if (searchFilter) {
    return filterItemList(itemList, searchFilter);
  }
  return itemList;
};

const mapStateToProps = (state) => {
  const { appState, halfState, linkState } = state;
  const { socket, showingHalf, showingItem, activeLinksOnly } = appState;
  const otherHalf = getOtherHalf(showingHalf);
  const otherHalfItemMap = halfState[otherHalf].items;

  return {
    showingHalf, showingItem,
    socket,
    linkModel: linkState.links,
    showingLinkMap: linkState.links.getLinks(showingHalf, showingItem._parityId),
    isFetching: halfState[otherHalf].isFetching,
    itemMap: otherHalfItemMap,
    searchFilter: appState.linkFilter,
    active: appState.linkPanel,
    activeLinksOnly,
    halfState
  };
};

export default connect(mapStateToProps, {
  onSearch: setLinkFilter,
  toggleActiveLinksOnly,
  onClose: toggleLinkPanel
})(LinkMenu);
