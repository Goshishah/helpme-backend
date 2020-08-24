const groups = require("express").Router(),
  authController = require("../../auth/auth.controller"),
  getAllUsers = require("./getAllUsers"),
  addUser = require("./addUser");

groups.get("/", authController.authenticateToken, getAllUsers);
groups.post("/", authController.authenticateToken, addUser);

module.exports = groups;
