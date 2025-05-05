const express = require("express");
const { getDashboardStats } = require("../controllers/stat.controller");
const { authenticateJWT, requireAdmin } = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/dashboard", authenticateJWT, requireAdmin, getDashboardStats);

module.exports = router;