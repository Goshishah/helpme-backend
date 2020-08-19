let express = require("express"),
  router = express.Router(),
  route = require("./route.name"),
  authController = require("../auth/auth.controller"),
  eventController = require("../event/event.controller");

//default route

router.get(route.default, (req, res) => {
  res.send("default");
});

// auth routes
router.post(route.register, authController.register);
router.post(route.login, authController.login);
router.post(route.logout, authController.logout);
router.get(route.events, eventController.events);

// 404 not found route
router.use((req, res) => {
  res.status(404);
  res.send("404 not found");
});

module.exports = router;
