'user strict';
const ProductInfo = require('../models/product_info.js');
const ProductPrice = require('../models/product_price.js');

const list = [
  {
    id: 15117729,
    current_price : { value: 500, currency_code: 'USD'},
    description: 'Iphone 8'
  },
  {
    id: 16483589,
    current_price : { value: 600, currency_code: 'USD'},
    description: 'Ipad Air'
  },
  {
    id: 16696652,
    current_price : { value: 900, currency_code: 'USD'},
    description: 'Iphone 10'
  },
  {
    id: 16752456,
    current_price : { value: 1500, currency_code: 'USD'},
    description: 'Macbook Air'
  },
  {
    id: 15643793,
    current_price : { value: 700, currency_code: 'USD'},
    description: 'Samsung S8'
  },
];

const populateProducts = () => {
  list.forEach((record) => {
    //
    const { id, current_price, description } = record;

    //Save product description
    const info = new ProductInfo({ id, description});

    info.save()
      .then(() => {
        //console.log(`Prdouct description saved for ${id}`);
      }).catch(() => {
        //console.log(err);
      });

    // Create the product price
    const price = new ProductPrice(id, current_price.value, current_price.currency_code);

    price.create()
      .then(() => {
        //console.log(`Product price saved for ${id}`);
      }).catch(() => {
        //console.log(err);
      });
    //
  });
};

const deleteProducts = () => {
  //delete product description
  ProductInfo.deleteMany( {})
    .then(() => {
      //console.log(`Product descriptions deleted`);
    }).catch(() => {
      //console.log(err);
    });
  const price = new ProductPrice();
  // delete all records
  price.deleteAll();
};

module.exports = { populateProducts, deleteProducts };
