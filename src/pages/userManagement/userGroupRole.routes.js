const express = require("express");
const router = express.Router();
const controller = require("./userGroupRole.controller");
const protect = require("../../middleware/auth.middleware");

router.use(protect);

router.get("/", controller.getAllGroups);

module.exports = router;
