import fuzzy from 'fuzzy';

export const itemMapToList = (itemMap) => {
  const itemsWithIds = Object.keys(itemMap).map((_parityId) => {
    return { ...itemMap[_parityId], _parityId };
  });
  return itemsWithIds;
};

export const filterItemList = (list, filter) => {
  const searchOptions = {
    extract: (item) => { return item._parityName || item._parityId; }
  };
  const searchResults = fuzzy.filter(filter, list, searchOptions);
  const filteredItems = searchResults.map((result) => {
    return {
      ...result.original,
      _parityName: result.string
    };
  });
  return filteredItems;
};
