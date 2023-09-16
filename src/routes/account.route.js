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

module.exports = router;
