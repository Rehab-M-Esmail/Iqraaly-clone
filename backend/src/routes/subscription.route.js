const express = require("express");
const { authenticateJWT } = require("../middleware/auth.middleware");
const { getAllPlans, createSubscription } = require("../controllers/subscription.controller");

const router = express.Router();

router.get("/", getAllPlans);
router.post("/", authenticateJWT, createSubscription);

module.exports = router;