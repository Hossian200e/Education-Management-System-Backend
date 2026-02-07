const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");

// ONLY login route
router.post("/login", authController.login);

module.exports = router;
