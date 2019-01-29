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
};

//extract db info from heroku env
if(process.env.JAWSDB_URL) {

  const arr = process.env.JAWSDB_URL.split(/[:@/]+/);
  db['production'] = {
    host     : arr[3],
    user     : arr[1],
    password : arr[2],
    database : arr[5]
  };

}

//mysql db connection
const connection = mysql.createConnection(db[process.env.NODE_ENV || 'local']);

module.exports = connection;