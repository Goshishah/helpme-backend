const { getAllGroups } = require("../../groups/groups.controller");

module.exports = (req, res, next) => {
  getAllGroups(req, res, next);
};
