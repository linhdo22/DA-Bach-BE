const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const { ROLES } = require("../config/type");
const { ADMIN, DOCTOR } = ROLES;

const drugController = require("../controllers/drug.controller");

router.get("/search", auth([ADMIN, DOCTOR]), drugController.searchDrug);
router.get("/", auth([ADMIN]), drugController.getDrugList);
router.post("/", auth([ADMIN]), drugController.createDrug);
router.patch("/", auth([ADMIN]), drugController.updateDrug);
router.delete("/", auth([ADMIN]), drugController.removeDrug);

module.exports = router;
