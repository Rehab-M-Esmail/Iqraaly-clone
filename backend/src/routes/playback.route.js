const { Router } = require("express");
const { playBook, pauseBook, getPlaybackState } = require("../controllers/playback.controller");
const { protectRoute } = require("../middleware/auth.middleware");
const router = Router();
router.post("/play", protectRoute, playBook);
router.post("/pause", protectRoute, pauseBook);
router.get("/state", protectRoute, getPlaybackState);

module.exports = router;