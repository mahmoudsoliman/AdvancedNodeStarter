const User = require('../../models/User')

const createUser = async () => {
  return User.create({});
}

module.exports = {
  createUser
}