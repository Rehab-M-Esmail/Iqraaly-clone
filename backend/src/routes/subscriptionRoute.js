const express = require("express");
const { authenticateJWT } = require("../middleware/authMiddleware");
const {
  getAllPlans,
  createSubscription,
} = require("../controllers/subscriptionController");

const router = express.Router();

router.get("/", getAllPlans);
router.post("/", authenticateJWT, createSubscription);

module.exports = router;
