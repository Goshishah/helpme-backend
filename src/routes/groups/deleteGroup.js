const { deleteGroup } = require("../../groups/groups.controller");

module.exports = (req, res, next) => {
  deleteGroup(req, res, next);
};
