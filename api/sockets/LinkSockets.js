const Link = require(__dirname + '/../models/Link.js');

const getEmitter = (
  socket,
  event,
  dataName='data',
  broadcast=false
) => {
  return (err, data) => {
    if (err) {
      console.log(`${event} event: ${err}`);
    }
    const emitData = {
      error: err,
      [dataName]: data
    };
    socket.emit(event, emitData);
    if (broadcast && !err) {
      socket.broadcast.emit(event, emitData);
    }
  }
};

const emitError = (socket, event, msg) => {
  socket.emit(event, {
    error: msg
  });
};


const invalidIds = ['undefined'];
const validLink = (link) => {
  let valid = true;
  const { leftId, rightId } = link;
  if (!leftId || !rightId) {
    return false;
  }
  if (invalidIds.includes(leftId) || invalidIds.includes(rightId)) {
    return false;
  }
  return true;
};

const LinkSockets = (socket) => {
  const INDEX_LINKS = 'index-links';
  socket.on(INDEX_LINKS, () => {
    Link.all(getEmitter(socket, INDEX_LINKS, 'links'));
  });

  const ADD_LINK = 'add-link';
  socket.on(ADD_LINK, (data) => {
    const { link } = data;
    console.log(ADD_LINK, link);
    if (link && validLink(link)) {
      Link.save(link,
        getEmitter(socket, ADD_LINK, 'link', broadcast=true));
    }
    else {
      emitError(socket, ADD_LINK, 'invalid link specified');
    }
  });

  const DELETE_LINK = 'delete-link';
  socket.on(DELETE_LINK, (data) => {
    const { link } = data;
    if (link) {
      Link.delete(link,
        getEmitter(socket, DELETE_LINK, 'link', broadcast=true));
    }
    else {
      emitError(socket, DELETE_LINK, 'no link specified');
    }
  });

  const FIND_LINKS = 'find-links';
  socket.on(FIND_LINKS, (data) => {
    const { half, id } = data;
    if (half && id) {
      Link.findByHalf(half, id, getEmitter(socket, FIND_LINKS, 'links'));
    }
    else {
      emitError(socket, FIND_LINKS, 'no half or no id specified');
    }
  });
};

module.exports = LinkSockets;
