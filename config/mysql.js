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

  const arr = process.env.JAWSDB_URL.split(':')
  const user = arr[1].substr(2);
  let pair = arr[2].split('@');
  const password = pair[0];
  const host = pair[1];
  pair = arr[3].split('/');
  const database = pair[1];

  db['production'] = {
    host     : host,
    user     : user,
    password : password,
    database : database
  };

}

//mysql db connection
const connection = mysql.createConnection(db[process.env.NODE_ENV || 'local']);

module.exports = connection;


