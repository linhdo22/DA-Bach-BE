const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const { ROLES } = require("../config/type");
const { ADMIN, CUSTOMER, DOCTOR } = ROLES;

const accountController = require("../controllers/account.controller");

router.get("/:id", auth([ADMIN]), accountController.getAccountById);
router.get("/", auth([ADMIN]), accountController.getAccountList);
router.post("/", accountController.createAccount);
router.patch("/", auth([ADMIN]), accountController.updateAccount);
router.delete("/", auth([ADMIN]), accountController.removeAccount);

router.post(
  "/change-password",
  auth([ADMIN, DOCTOR, CUSTOMER]),
  accountController.changePassword
);
router.post(
  "/change-profile",
  auth([ADMIN, DOCTOR, CUSTOMER]),
  accountController.changeProfile
);

module.exports = router;
