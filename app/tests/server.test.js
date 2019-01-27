'user strict';
process.env.NODE_ENV = 'test';

const expect = require('expect');
const request = require('supertest');

const seed = require('./seed');
const app = require('../../server'); // the express server

let token;

before(() => {
  return new Promise((resolve) => {
    seed.populateProducts();
    setTimeout(() => {
      request(app)
        .post('/users/authenticate')
        .send({
          username: 'test',
          password: 'test',
        })
        .end((err, response) => {
          token = response.body.token; // save the token!
        });
      resolve();
    }, 500);
  });
});

describe('GET /', () => {
  // token not being sent - should respond with a 401
  it('should require authorization', (done) => {
    request(app)
      .get('/')
      .expect(401)
      .end((err) => {
        if(err)
          return done(err);

        done();
      });
  });

  //send the token - should respond with a 200
  it('responds with JSON', (done) => {
    request(app)
      .get('/')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        done();
      })
      .catch(err => {
        done(err);
      });
  });

});

describe('POST /products/create_info', () => {
  it('should create product description', (done) => {
    request(app)
      .post('/products/create_info')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: 12345678,
        description: "Test product",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});

describe('POST /products/create', () => {
  it('should create product price', (done) => {
    request(app)
      .post('/products/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: 12345678,
        current_price : { value: 550, currency_code: 'USD'},
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});

describe('PUT /products/update', () => {
  it('should update product price', (done) => {
    request(app)
      .put(`/products/update/${15117729}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        current_price : { value: 111, currency_code: 'USD'},
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});

describe('DELETE /products/delete', () => {
  it('should delete product price', (done) => {
    request(app)
      .delete(`/products/${16696652}`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});

describe('GET /products/delete', () => {
  it('should retrieve product price with description', (done) => {
    request(app)
      .get(`/products/${15643793}`)
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        const { current_price, product_desc } = response.body;
        expect(response.statusCode).toBe(200);
        expect(current_price.value).toBe(700);
        expect(current_price.currency_code).toBe("USD");
        expect(product_desc).toBe("Samsung S8");
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});

after(() => {
  return new Promise((resolve) => {
    seed.deleteProducts();
    setTimeout(() => {
      resolve();
    }, 500);
  });
});