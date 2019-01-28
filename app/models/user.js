const config = require('../../config/jwt.json');
const jwt = require('jsonwebtoken');

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

module.exports = {
  authenticate,
  getAll
};

async function authenticate({ username, password }) {
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ sub: user.id }, config.secret);
    const { ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      token
    };
  }
}

async function getAll() {
  return users.map(u => {
    const { ...userWithoutPassword } = u;
    return userWithoutPassword;
  });
}