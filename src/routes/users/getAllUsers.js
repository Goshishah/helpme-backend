const { getAllUsers } = require("../../users/app.users.controller");

module.exports = (req, res, next) => {
  getAllUsers(req, res, next);
};
