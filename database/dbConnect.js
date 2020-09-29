const mysql = require('mysql');
const config = require('../config/config.js');

const connection = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

module.exports = { connection };
