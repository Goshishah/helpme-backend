const { addGroup } = require("../../groups/groups.controller");

module.exports = (req, res, next) => {
  addGroup(req, res, next);
};
