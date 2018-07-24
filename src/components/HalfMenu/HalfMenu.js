import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemMapToList, filterItemList } from '../../utils/ItemHelper';
import ItemList from '../ItemList';
import ItemListItem from '../ItemListItem';
import HalfMenuOptions from '../HalfMenuOptions';
import SearchBar from '../SearchBar';

import {
  invalidateHalf,
  fetchHalfIfNeeded,
  toggleShowingHalf,
  setShowingItem,
  setSearchFilter
} from '../../store/actions';

import './HalfMenu.css';

export class HalfMenu extends Component {
  constructor(props) {
    super(props);
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.showingHalf !== this.props.showingHalf) {
      this.fetch();
    }
  }

  render() {
    const {
      invalidateHalf,
      onToggleHalf,
      onFetch,
      onSelectItem,
      onSearch,
      showingHalf,
      showingItem,
      halfState,
      links,
      searchFilter
    } = this.props;
    const { halfClass, items, isFetching } = halfState[showingHalf];

    return (
      <div className="menu half-menu panel">
        <h1 className="header ellipsis-overflow">
          {halfClass.title}
        </h1>
        <div className="search-wrapper">
          <SearchBar onSearch={onSearch} currentValue={searchFilter}/>
        </div>
        <ItemList
          items={this.processItems(items)}
          isFetching={isFetching}
          generateListItem={(item) => {
            const itemLinks = links.getLinks(showingHalf, item._parityId);
            const linkCount = Object.keys(itemLinks).length;

            return (
              <ItemListItem
                key={item._parityId}
                item={item}
                isSelected={showingItem._parityId === item._parityId}
                onSelect={onSelectItem}
                accent={(
                  linkCount !== 0 &&
                  <span className="link-count">
                    <span className="icon icon-16 icon-link"></span>
                    { linkCount === 1 ? '' : linkCount }
                  </span>
                )}
              />
            );
          }}
        />
        <HalfMenuOptions
          showingHalf={showingHalf}
          halfState={halfState}
          dispatchers={{
            invalidateHalf,
            onToggleHalf,
            onFetch
          }}
        />
      </div>
    );
  }

  fetch() {
    const { showingHalf, halfState, onFetch } = this.props;
    onFetch(showingHalf, halfState[showingHalf].halfClass.fetch);
  }

  /**
   * Converts itemMap into array of items with IDs injected in.
   * Also applies the search filter.
   * @param  {[type]} itemMap [description]
   * @return {[type]}         [description]
   */
  processItems(itemMap) {
    const { searchFilter } = this.props;
    const itemList = itemMapToList(itemMap);
    if (searchFilter) {
      return filterItemList(itemList, searchFilter);
    }
    return itemList;
  }
}

const mapStateToProps = (state) => {
  const { appState, halfState, linkState } = state;
  return {
    showingHalf: appState.showingHalf,
    showingItem: appState.showingItem,
    searchFilter: appState.searchFilter,
    links: linkState.links,
    halfState
  };
};

export default connect(
  mapStateToProps,
  {
    invalidateHalf,
    onFetch: fetchHalfIfNeeded,
    onToggleHalf: toggleShowingHalf,
    onSelectItem: setShowingItem,
    onSearch: setSearchFilter
  }
)(HalfMenu);
