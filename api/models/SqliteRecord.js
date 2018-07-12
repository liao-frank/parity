const sqlite3 = require('sqlite3').verbose();
const db = require(__dirname + '/../db');

class SqliteRecord {
  constructor() {
    this.db = db;

    const name = this.constructor.name;
    this._createTable((err) => {
      if (err) {
        console.log(
          `Could not create table ${name}:${err.toString().split(':').pop()}`
        );
      }
      else {
        console.log(`Created table '${name}'`)
      }
    });
  }

  /**
   * To be implemented by subclass.
   * @return {Object} schema => columnName: specs
   */
  schema() {
    return {};
  }

  _schema() {
    const schema = this.schema();
    if (!schema.KEY) {
      schema['_id'] = 'varchar(255)';
      schema['KEY'] = '(_id)';
    }
    return schema;
  }

  // filters record object by schema keys. No other columns allowed, boo!
  // _generateRecord(recordObj) {
  //   const schema = this._schema();
  //   const filteredRecord = {};
  //
  //   for (let key in record) {
  //     if (key in schema) {
  //       filteredRecord[key] = record[key];
  //     }
  //   }
  //   return filteredRecord;
  // }

  find(id, callback=()=>{}) {
    const name = this.constructor.name;

    let statement = `SELECT * FROM ${name} WHERE _id = '${id}'`;
    this.db.get(statement, [], callback);
  }

  all(callback=()=>{}) {
    const name = this.constructor.name;
    let statement = `SELECT * FROM ${name}`;
    this.db.all(statement, [], callback);
  }

  _createTable(callback=()=>{}) {
    const name = this.constructor.name;
    const schema = this._schema();

    let schemaString = Object.entries(schema)
      .filter(([columnName, spec]) => columnName !== 'KEY')
      .map(([columnName, spec]) => `${columnName} ${spec}`)
      .join(', ');
    if (schema.KEY) {
      schemaString += `, PRIMARY KEY ${schema.KEY}`;
    }

    let statement = `CREATE TABLE ${name} (${schemaString})`;
    this.db.run(statement, [], callback);
  }

  _dropTable(callback=()=>{}) {
    const name = this.constructor.name;

    let statement = `DROP TABLE ${name}`;
    this.db.run(statement, [], callback);
  }
}

module.exports = SqliteRecord;
