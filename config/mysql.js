'user strict';

var mysql = require('mysql');

const db = {
  test: {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'myretail_test_db'
  },
  local: {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'myretail_db'
  },
  production: {
    host     : 'sp6xl8zoyvbumaa2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user     : 'dbeen3fw3z0pthlf',
    password : 'q0qfw49to7or04vy',
    database : 'ncuqma1u0grwa99h'
  }
};

//mysql db connection
const connection = mysql.createConnection(db[process.env.NODE_ENV || 'local']);

module.exports = connection;