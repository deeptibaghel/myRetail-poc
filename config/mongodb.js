
const mongo_url = {
  test: 'mongodb://localhost:27017/myretail-test-db',
  local: 'mongodb://localhost:27017/myretail-db',
  production: 'mongodb://myretail_mongo_user:2018mongo@ds213705.mlab.com:13705/heroku_pfxdxxtw'
};

module.exports = {
  url: mongo_url[process.env.NODE_ENV || 'local']
};