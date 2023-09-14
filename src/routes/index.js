const express = require("express");

const router = express.Router();
const authRoute = require("./auth.route");
const accountRoute = require("./account.route");

const defaultRoutes = [
  {
    path: "/account",
    route: accountRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
