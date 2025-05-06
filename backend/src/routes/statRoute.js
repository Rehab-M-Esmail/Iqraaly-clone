const express = require("express");
const { getDashboardStats } = require("../controllers/statController");
const {
  authenticateJWT,
  requireAdmin,
} = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/dashboard", authenticateJWT, requireAdmin, getDashboardStats);

module.exports = router;
