const user = require('../models/user');

exports.authenticate = (req, res, next) => {
  user.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).send({ message: 'Username or password is incorrect' }))
    .catch(err => next(err));
};

exports.getAll = (req, res, next) => {
  user.getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
};