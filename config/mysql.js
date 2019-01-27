'user strict';

var mysql = require('mysql');

//local mysql db connection
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : process.env.NODE_ENV === 'production' ? 'myretail_db' : 'myretail_test_db'
});

module.exports = connection;