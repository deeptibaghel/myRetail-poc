const expressJwt = require('express-jwt');
const config = require('../../config/jwt.json');

module.exports = () => {
  const { secret } = config;
  return expressJwt({ secret }).unless({
    path: [
      // public routes that don't require authentication
      '/users/authenticate'
    ]
  });
};