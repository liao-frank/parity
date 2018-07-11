const uuidv4 = require('uuid/v4');
const Link = require(__dirname + '/Link.js');
const db = Link.db;

db.serialize(() => {
  const leftId = uuidv4();
  Link.findByLeft(leftId, (err, result) => {
    console.log(err, result);
  });
  Link.save({
    left_id: leftId,
    right_id: 'foo'
  });
  Link.findByLeft(leftId, (err, result) => {
    console.log(err, result);
  });
  Link.find({leftId, rightId: 'foo'}, (err, result) => {
    console.log(err, result);
  });
  Link.delete({leftId, rightId: 'foo'}, (err) => {
    console.log(err);
  });
  Link.find({leftId, rightId: 'foo'}, (err, result) => {
    console.log(err, result);
  });
});
