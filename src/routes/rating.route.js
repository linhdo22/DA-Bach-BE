const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const { ROLES } = require("../config/type");
const { ADMIN, DOCTOR, CUSTOMER } = ROLES;

const ratingController = require("../controllers/rating.controller");

router.get("/", auth([DOCTOR, CUSTOMER]), ratingController.getRatingList);
router.post("/", auth([CUSTOMER]), ratingController.createRating);
router.get("/check", auth([CUSTOMER]), ratingController.checkRated);

module.exports = router;
