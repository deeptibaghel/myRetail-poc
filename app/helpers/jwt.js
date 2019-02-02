const expressJwt = require('express-jwt');
const config = require('../../config/jwt.json');
const userModel = require('../models/user');

module.exports = () => {
  const { secret } = config;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      '/users/authenticate',
      '/'
    ]
  });
};

async function isRevoked(req, payload, done) {
  const user = await userModel.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}