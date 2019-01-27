'user strict';

module.exports = (app) => {
  const product = require('../controllers/product.js');
  const user = require('../controllers/user.js');

  app.post('/users/authenticate', user.authenticate);

  app.get('/users', user.getAll);

  // Create  product description
  app.post('/products/create_info', product.createInfo);

  //Create product price
  app.post('/products/create', product.createPrice);

  // Update the product price
  app.put('/products/update/:id', product.updatePrice);

  // delete the product price
  app.delete('/products/:id', product.deletePrice);

  // Update the product description
  app.put('/products/update_info/:id', product.updateInfo);

  // Retrieve Product price and description
  app.get('/products/:id', product.findOne);

};