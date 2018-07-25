import { LEFT_HALF, RIGHT_HALF } from '../../utils/HalfHelper';

const deepCopy = (obj) => {
  return Object.entries(obj).reduce(
    (copy, [key, value]) => {
      copy[key] = (typeof value === 'object') ? deepCopy(value) : value;
      return copy;
    },
    {}
  );
}

class ManyToMany {
  constructor(manyToMany) {
    this.fromLeft = manyToMany ? deepCopy(manyToMany.fromLeft) : {};
    this.fromRight = manyToMany ? deepCopy(manyToMany.fromRight) : {};
  }

  getLink(leftKey, rightKey) {
    const leftLinks = this.fromLeft[leftKey];
    if (leftLinks) {
      const link = leftLinks[rightKey];
      return link;
    }
    return undefined;
  }

  getLinks(side, key, array=false) {
    if (side === LEFT_HALF) {
      return this.fromLeft[key] || {};
    }
    else if (side === RIGHT_HALF) {
      return this.fromRight[key] || {};
    }
    return undefined;
  }

  hasLink(leftKey, rightKey) {
    const leftLinks = this.fromLeft[leftKey];
    return rightKey in leftLinks;
  }

  addLink(link, leftKey='', rightKey='') {
    if (!link) {
      return false;
    }
    leftKey = leftKey || link.leftId;
    rightKey = rightKey || link.rightId;
    const { fromLeft, fromRight } = this;

    if (fromLeft[leftKey]) {
      fromLeft[leftKey][rightKey] = link;
    }
    else {
      fromLeft[leftKey] = { [rightKey]: link };
    }
    if (fromRight[rightKey]) {
      fromRight[rightKey][leftKey] = link;
    }
    else {
      fromRight[rightKey] = { [leftKey]: link };
    }
    return true;
  }

  deleteLink(leftKey, rightKey) {
    if (leftKey && typeof leftKey === 'object' && !rightKey) {
      rightKey = leftKey.rightId;
      leftKey = leftKey.leftId;
    }
    const leftLinks = this.fromLeft[leftKey];
    const rightLinks = this.fromRight[rightKey];
    if (leftLinks) {
      delete leftLinks[rightKey];
      if (Object.keys(leftLinks).length === 0) {
        delete this.fromLeft[leftKey];
      }
    }
    if (rightLinks) {
      delete rightLinks[leftKey];
      if (Object.keys(rightLinks).length === 0) {
        delete this.fromRight[rightKey];
      }
    }
    return true;
  }
}

export default ManyToMany;
