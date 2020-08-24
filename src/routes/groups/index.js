const groups = require("express").Router(),
  authController = require("../../auth/auth.controller"),
  getAllGroups = require("./getAllGroups"),
  addGroup = require("./addGroup");

groups.get("/", authController.authenticateToken, getAllGroups);
groups.post("/", authController.authenticateToken, addGroup);

module.exports = groups;
