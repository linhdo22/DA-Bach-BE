const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const authController = require("../controllers/auth.controller");
const { ROLES } = require("../config/type");
const { ADMIN, CUSTOMER, DOCTOR } = ROLES;

router.post("/sign-in", authController.signIn);
router.post(
  "/sign-out",
  auth([ADMIN, CUSTOMER, DOCTOR]),
  authController.signOut
);
router.post("/refresh-token", authController.refreshToken);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
