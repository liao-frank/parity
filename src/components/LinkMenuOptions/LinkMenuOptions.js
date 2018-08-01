import React from 'react';
import { CSVLink } from 'react-csv';
import { LEFT_HALF, RIGHT_HALF } from '../../utils/HalfHelper';

import MenuOptions from '../MenuOptions';
import MenuOptionsItem from '../MenuOptionsItem';

const LinkMenuOptions = (props) => {
  const { linkModel, halfState } = props;

  const leftHalfTitle = halfState[LEFT_HALF].halfClass.title;
  const rightHalfTitle = halfState[RIGHT_HALF].halfClass.title;
  const leftItems = halfState[LEFT_HALF].items;
  const rightItems = halfState[RIGHT_HALF].items;

  if (!Object.keys(leftItems).length || !Object.keys(rightItems).length) {
    return null;
  }

  const links = linkModel.fromLeft;
  const CSVdata = [[
    `${leftHalfTitle} id`, `${leftHalfTitle} name`,
    `${rightHalfTitle} id`, `${rightHalfTitle} name`
  ]];
  for (let leftId in links) {
    const leftName = leftItems[leftId]['_parityName'] || '';
    for (let rightId in links[leftId]) {
      const rightName = rightItems[rightId]['_parityName'] || '';
      CSVdata.push([
        leftId, leftName, rightId, rightName
      ]);
    }
  }

  return (
    <MenuOptions>
      <CSVLink
        data={CSVdata}
        filename={
          `${leftHalfTitle.replace(/\s/g, '_')}-` +
          `${rightHalfTitle.replace(/\s/g, '_')}-` +
          `links.csv`
        }
      >
        <MenuOptionsItem>
          <div className="icon icon-14 icon-download"></div>
          Export All Links to CSV
        </MenuOptionsItem>
      </CSVLink>
    </MenuOptions>
  );
}

export default LinkMenuOptions;
