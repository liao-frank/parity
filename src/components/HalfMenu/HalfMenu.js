import React, { Component } from 'react';
import { connect } from 'react-redux';
import fuzzy from 'fuzzy';
import HalfList from '../HalfList';
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
      links
    } = this.props;
    const { halfClass, items, isFetching } = halfState[showingHalf];
    return (
      <div className="menu half-menu panel">
        <h1 className="header ellipsis-overflow">
          {halfClass.title}
        </h1>
        <div className="search-wrapper">
          <SearchBar onSearch={onSearch}/>
        </div>
        <HalfList
          showingHalf={showingHalf}
          showingItem={showingItem}
          items={this.processItems(items)}
          isFetching={isFetching}
          links={links}
          onSelectItem={onSelectItem}
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
    const itemsWithIds = Object.keys(itemMap).map((_parityId) => {
      return { ...itemMap[_parityId], _parityId };
    });
    if (searchFilter) {
      const searchOptions = {
        extract: (item) => { return item._parityName || item._parityId; }
      };
      const searchResults = fuzzy.filter(searchFilter, itemsWithIds, searchOptions);
      const filteredItems = searchResults.map((result) => {
        return {
          ...result.original,
          _parityName: result.string
        };
      });
      return filteredItems;
    }
    return itemsWithIds;
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
