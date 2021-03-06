import fuzzy from 'fuzzy';

export const itemMapToList = (itemMap) => {
  const itemsWithIds = Object.keys(itemMap).map((_parityId) => {
    return itemMap[_parityId];
  });
  return itemsWithIds;
};

export const filterItemList = (list, filter) => {
  const searchOptions = {
    extract: (item) => { return item._parityName || item._parityId },
    pre: '<em>',
    post: '</em>'
  };
  const searchResults = fuzzy.filter(filter, list, searchOptions);
  const filteredItems = searchResults.map((result) => {
    return {
      ...result.original,
      _paritySearchName: result.string
    };
  });
  return filteredItems;
};
