
const mongo_url = {
  test: 'mongodb://localhost:27017/myretail-test-db',
  local: 'mongodb://localhost:27017/myretail-db',
  production: process.env.MONGODB_URI
};

module.exports = {
  url: mongo_url[process.env.NODE_ENV || 'local']
};