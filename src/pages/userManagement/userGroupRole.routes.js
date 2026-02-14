const express = require("express");
const router = express.Router();
const controller = require("./userGroupRole.controller");
const protect = require("../../middleware/auth.middleware");

// All routes protected
router.use(protect);

router.get("/", controller.getAllGroupsWithRoles); // GET all groups with roles
router.get("/:id", controller.getGroupRoles);      // GET roles by group
router.post("/", controller.addRole);              // Add a role
router.put("/:id", controller.updateRole);        // Update a role

module.exports = router;
