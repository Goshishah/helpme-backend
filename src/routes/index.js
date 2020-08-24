const router = require("express").Router(),
  route = require("./route.name"),
  authController = require("../auth/auth.controller"),
  appUsersController = require("../users/app.users.controller"),
  groupsRote = require("./groups"),
  beneficiaryDetailRotes = require("./beneficiary-detail"),
  usersRote = require("./users");

//default route
router.get(route.default, (req, res) => {
  res.send("default");
});

// auth routes
router.get(
  route.verify,
  authController.authenticateToken,
  authController.verify
);
router.post(route.register, authController.register);
router.post(route.login, authController.login);
router.post(route.logout, authController.logout);

// users routes

router.use(route.users, usersRote);
// groups routes

router.use(route.groups, groupsRote);
// /beneficiary-details routes

router.use(route.beneficiaryDetails, beneficiaryDetailRotes);

// 404 not found route
router.use((req, res) => {
  res.status(404);
  res.send("404 not found");
});

module.exports = router;
