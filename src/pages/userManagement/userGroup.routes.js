const express = require("express");
const router = express.Router();
const userGroupController = require("./userGroup.controller");
const protect = require("../../middleware/auth.middleware");

// All routes are protected
router.use(protect);

router.get("/", userGroupController.getAllGroups);
router.get("/:id", userGroupController.getGroup);
router.post("/", userGroupController.createGroup);
router.put("/:id", userGroupController.updateGroup);

module.exports = router;
