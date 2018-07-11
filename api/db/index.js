const sqlite3 = require('sqlite3').verbose();
const { DB } = require(__dirname + '/../config.js');

const db = new sqlite3.Database(DB);
module.exports = db;
