const uuidv4 = require('uuid/v4');
const Link = require(__dirname + '/Link.js');
const db = Link.db;

const logger = (err, result) => {
  console.log(err, result);
}

db.serialize(() => {
  const leftId = uuidv4();
  const link = {
    leftId: leftId,
    rightId: 'foo'
  };
  Link.findByLeft(leftId, logger);
  Link.find(link, logger);
  Link.save(link, logger);
  Link.find(link, logger);
  Link.findByLeft(leftId, logger);
  Link.find({leftId, rightId: 'foo'}, logger);
  Link.delete({leftId, rightId: 'foo'}, logger);
  Link.findByLeft(leftId, logger);
  Link.find({leftId, rightId: 'foo'}, logger);
  // Link.find({leftId, rightId: 'foo'}, logger);
  // Link.all(logger);
  // Link.save(link, logger);
});
