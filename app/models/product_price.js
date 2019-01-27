'user strict';
const sql = require('../../config/mysql.js');

sql.connect((err) => {
  if(err) {
    console.log('Could not connect to mysql database. Exiting now...', err);
    process.exit();
  }
  else  {
    console.log("Successfully connected to mysql database");
  }
});

module.exports = class Product {
  constructor(id, current_price, currency_code) {
    this.id = id;
    this.current_price = current_price;
    this.currency_code = currency_code;
  }

  create() {
    return new Promise((resolve, reject) => {
      const product = {
        id : this.id,
        current_price : this.current_price,
        currency_code : this.currency_code,
      };
      sql.query("INSERT INTO price set ?", product, (err)  => {
        if(err)
          reject(err);
        else
          resolve('Price record inserted');
      });
    });
  }

  find(id) {
    return new Promise((resolve, reject) => {
      sql.query("select * from price where id = ?", id, (err, res)  => {
        if(err)
          reject(err);
        else
          resolve(res);
      });
    });
  }

  update() {
    return new Promise((resolve, reject) => {
      sql.query("UPDATE price SET current_price = ?, currency_code = ? WHERE id = ?",
        [this.current_price, this.currency_code, this.id], function (err, res) {
          if(err)
            reject(err);
          else
            resolve(res);
        });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      sql.query("delete from price WHERE id = ?", id, function (err, res) {
        if(err)
          reject(err);
        else
          resolve(res);
      });
    });
  }

  deleteAll() {
    return new Promise((resolve, reject) => {
      sql.query("delete from price ", "" , function (err, res) {
        if(err)
          reject(err);
        else
          resolve(res);
      });
    });
  }
};

