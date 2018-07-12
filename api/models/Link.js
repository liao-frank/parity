const SqliteRecord = require(__dirname + '/SqliteRecord.js');

class Link extends SqliteRecord {
  schema() {
    return {
      'left_id': 'varchar(255)',
      'right_id': 'varchar(255)',
      'KEY': '(left_id, right_id)'
    };
  }

  save(record, callback=()=>{}) {
    const name = this.constructor.name;
    const { leftId, rightId } = record;
    let recordString = `'${leftId}', '${rightId}'`;
    let statement = `INSERT INTO ${name} VALUES (${recordString})`;

    this.db.run(statement, [], callback);
  }

  delete(record, callback=()=>{}) {
    const name = this.constructor.name;
    const { leftId, rightId } = record;
    let statement = `DELETE FROM ${name} WHERE left_id='${leftId}' AND ` +
      `right_id='${rightId}'`;
    this.db.run(statement, [], callback);
  }

  find(record, callback=()=>{}) {
    const name = this.constructor.name;
    const { leftId, rightId } = record;

    let statement = `SELECT * FROM ${name} WHERE left_id = '${leftId}' AND ` +
      `right_id = '${rightId}'`;
    this.db.get(statement, [], callback);
  }

  findByLeft(leftId, callback=()=>{}) {
    const name = this.constructor.name;

    let statement = `SELECT * FROM ${name} WHERE left_id='${leftId}'`;
    this.db.all(statement, [], callback);
  }

  findByRight(rightId, callback=()=>{}) {
    const name = this.constructor.name;

    let statement = `SELECT * FROM ${name} WHERE right_id='${rightId}'`;
    this.db.all(statement, [], callback);
  }
}

module.exports = new Link();
