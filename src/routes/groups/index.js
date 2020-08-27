const groups = require("express").Router(),
  authController = require("../../auth/auth.controller"),
  getAllGroups = require("./getAllGroups"),
  addGroup = require("./addGroup"),
  updateGroup = require("./updateGroup"),
  deleteGroup = require("./deleteGroup");

groups.get("/", authController.authenticateToken, getAllGroups);
groups.post("/", authController.authenticateToken, addGroup);
groups.put("/", authController.authenticateToken, updateGroup);
groups.delete("/:id", authController.authenticateToken, deleteGroup);

module.exports = groups;
