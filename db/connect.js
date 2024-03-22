const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config/config.js');

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  mongoose.connect(MONGODB_URI);

  _db = mongoose.connection;
  _db.on('error', (err) => {
    callback(err);
  });
  _db.once('open', () => {
    console.log('Connected to database');
    callback(null, _db);
  });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};
