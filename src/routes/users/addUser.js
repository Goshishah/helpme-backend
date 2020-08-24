const { addUser } = require("../../users/app.users.controller");

module.exports = (req, res, next) => {
  addUser(req, res, next);
};
