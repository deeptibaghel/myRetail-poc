'user strict';
const ProductInfo = require('../models/product_info.js');
const ProductPrice = require('../models/product_price.js');

// Create new Product Price
exports.createPrice = (req, res) => {
  const { id, current_price } = req.body;

  // Validate request
  if(!id || !current_price) {
    return res.status(400).send({
      message: "Product id and price can not be empty"
    });
  }

  // Create the product price
  const productPrice = new ProductPrice(id, current_price.value, current_price.currency_code);

  //check if product id already exists
  productPrice.find(id)
    .then(resp => {
      if(resp.length == 0) {
        productPrice.create()
          .then(msg => {
            res.send({
              message: msg
            });
          }).catch(err => {
            res.status(500).send({
              message: err || "Some error occurred while adding the product price"
            });
          });
      }
      else {
        return res.status(404).send({
          message: `Product price for id ${id} already exists`
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while adding the product price"
      });
    });
};

// Update the Product price identified by the id in the request
exports.updatePrice = (req, res) => {
  const { id } = req.params;
  const { current_price } = req.body;

  // Validate Request
  if(!id || !current_price) {
    return res.status(400).send({
      message: "Product id and price are required"
    });
  }

  // Create the product price
  const productPrice = new ProductPrice(id, current_price.value, current_price.currency_code);

  //check if product id exists
  productPrice.find(id)
    .then(resp => {
      if(resp.length == 0) {
        return res.status(404).send({
          message: `Product price for id ${id} not found`
        });
      }
      else {
        productPrice.update()
          .then(() => {
            res.send({
              message: "Product price updated"
            });
          }).catch(err => {
            res.status(500).send({
              message: err || "Some error occurred while updating the product price"
            });
          });
      }
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while updating the product price"
      });
    });
};


// delete the Product price identified by the id in the request
exports.deletePrice = (req, res) => {
  const { id } = req.params;
  // Validate Request
  if(!id ) {
    return res.status(400).send({
      message: "Product id is required"
    });
  }
  const productPrice = new ProductPrice();

  productPrice.delete(id)
    .then(resp => {
      res.send({
        message: resp.affectedRows > 0 ? "Price deleted" : "Price not found"
      });
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the product price"
      });
    });
};

// Create new Product Info
exports.createInfo = (req, res) => {
  const { id, description } = req.body;

  // Validate request
  if(!id || !description ) {
    return res.status(400).send({
      message: "Product id and description can not be empty"
    });
  }

  //check if product id already exists
  ProductInfo.findOne({ id })
    .then(resp => {
      if(resp) {
        return res.status(404).send({
          message: `Product with id ${id} already exists`
        });
      }
      // Create the product
      const product = new ProductInfo({
        id: id,
        description: description,
      });

      product.save()
        .then(data => {
          res.send(data);
        }).catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while creating the product."
          });
        });
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the product."
      });
    });
};

// Update a Product info identified by the id in the request
exports.updateInfo = (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  // Validate Request
  if(!id || !description) {
    return res.status(400).send({
      message: "Product id and description are required"
    });
  }

  // Find product and update it with the request body
  ProductInfo.findOneAndUpdate( { id }, {
    description
  }, { new: true })
    .then(product => {
      if(!product) {
        return res.status(404).send({
          message: `Product not found with id ${id}`
        });
      }
      res.send(product);
    }).catch(() => {
      return res.status(500).send({
        message: `Error updating product with id ${id}`
      });
    });
};


// Find  Product price
exports.findPrice = (req, res) => {
  const { id } = req.params;

  if(!id) {
    return res.status(400).send({
      message: "Product id is required to find the product"
    });
  }

  const productPrice = new ProductPrice();

  //find price
  productPrice.find(id)
    .then(resp => {
      if(resp.length == 0) {
        return res.status(404).send({
          message: `Product price for id ${id} not found`
        });
      }
      else {
        res.send({
          id: id,
          current_price: {
            value: resp[0].current_price,
            currency_code: resp[0].currency_code,
          }
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while finding the product price"
      });
    });
};

// Find  Product price and description
exports.findDetail = (req, res) => {
  const { id } = req.params;

  if(!id) {
    return res.status(400).send({
      message: "Product id is required to find the product"
    });
  }

  const productPrice = new ProductPrice();

  //find price
  productPrice.find(id)
    .then(resp => {
      if(resp.length == 0) {
        return res.status(404).send({
          message: `Product price for id ${id} not found`
        });
      }
      else {
        //find description
        ProductInfo.findOne({ id })
          .then(product => {
            if(!product) {
              return res.status(404).send({
                message: `Product not found with id ${id}`
              });
            }
            const result = {
              id: id,
              current_price: {
                value: resp[0].current_price,
                currency_code: resp[0].currency_code,
              },
              product_desc: product.description
            };
            res.send(result);

          }).catch(() => {
            return res.status(500).send({
              message: `Error retrieving product detail with id ${id}`
            });
          });
      }
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while finding the product price"
      });
    });
};



