const express = require("express");

const router = express.Router();
const authRoute = require("./auth.route");
const accountRoute = require("./account.route");
const drugRoute = require("./drug.route");
const bookingRoute = require("./booking.route");
const ratingRoute = require("./rating.route");

const defaultRoutes = [
  {
    path: "/account",
    route: accountRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/drug",
    route: drugRoute,
  },
  {
    path: "/booking",
    route: bookingRoute,
  },
  {
    path: "/rating",
    route: ratingRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
