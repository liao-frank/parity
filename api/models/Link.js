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

    this.db.run(statement, [], (err) => {
      callback(err, err ? null : record);
    });
  }

  delete(record, callback=()=>{}) {
    const name = this.constructor.name;
    const { leftId, rightId } = record;
    let statement = `DELETE FROM ${name} WHERE left_id='${leftId}' AND ` +
      `right_id='${rightId}'`;
    this.db.run(statement, [], (err) => {
      callback(err, err ? null : record);
    });
  }

  all(callback=()=>{}) {
    const name = this.constructor.name;
    let statement = `SELECT * FROM ${name}`;
    this.db.all(statement, [], (err, rows) => {
      callback(err, rows.map(r => this.camelcase(r)));
    });
  }

  find(record, callback=()=>{}) {
    const name = this.constructor.name;
    const { leftId, rightId } = record;

    let statement = `SELECT * FROM ${name} WHERE left_id = '${leftId}' AND ` +
      `right_id = '${rightId}'`;
    this.db.get(statement, [], (err, row) => {
      callback(err, this.camelcase(row));
    });
  }

  findByHalf(half, id, callback=()=>{}) {
    const name = this.constructor.name;

    if (half === 'left') {
      this.findByLeft(id, callback);
    }
    else if (half === 'right') {
      this.findByRight(id, callback);
    }
    else {
      callback('invalid half specified for `findByHalf`', null);
    }
  }

  findByLeft(leftId, callback=()=>{}) {
    const name = this.constructor.name;

    let statement = `SELECT * FROM ${name} WHERE left_id='${leftId}'`;
    this.db.all(statement, [], (err, rows) => {
      callback(err, rows.map(r => this.camelcase(r)));
    });
  }

  findByRight(rightId, callback=()=>{}) {
    const name = this.constructor.name;

    let statement = `SELECT * FROM ${name} WHERE right_id='${rightId}'`;
    this.db.all(statement, [], (err, rows) => {
      callback(err, rows.map(r => this.camelcase(r)));
    });
  }

  camelcase(linkRow) {
    const link = {};
    Object.keys(linkRow).forEach((key) => {
      const segments = key.match(/([a-zA-Z]+)/g).map((s, index) => {
        if (index !== 0) {
          return s.charAt(0).toUpperCase() + s.slice(1);
        }
        return s;
      });
      const newKey = segments.join('');
      link[newKey] = linkRow[key];
    });
    return link;
  }
}

module.exports = new Link();
