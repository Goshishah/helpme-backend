const { updateGroup } = require("../../groups/groups.controller");

module.exports = (req, res, next) => {
  updateGroup(req, res, next);
};
