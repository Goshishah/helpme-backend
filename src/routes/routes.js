let express = require("express"),
  router = express.Router(),
  route = require("./route.name"),
  authController = require("../auth/auth.controller"),
  eventController = require("../event/event.controller"),
  appUsersController = require("../app-users/app.users.controller");

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
router.get(
  route.users,
  authController.authenticateToken,
  appUsersController.users
);
router.get(route.events, eventController.events);

// 404 not found route
router.use((req, res) => {
  res.status(404);
  res.send("404 not found");
});

module.exports = router;
