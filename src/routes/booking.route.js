const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const { ROLES } = require("../config/type");
const { ADMIN, CUSTOMER, DOCTOR } = ROLES;
const bookingController = require("../controllers/booking.controller");

router.get("/", auth([DOCTOR, CUSTOMER]), bookingController.getBookingList);
router.get("/:id", auth([DOCTOR, CUSTOMER]), bookingController.getBookingItem);
router.patch("/", auth([DOCTOR]), bookingController.updateBooking);
router.patch("/finish", auth([DOCTOR]), bookingController.finishBooking);

module.exports = router;
