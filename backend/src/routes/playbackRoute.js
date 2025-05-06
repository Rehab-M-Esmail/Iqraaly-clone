const { Router } = require("express");
const {
  playBook,
  pauseBook,
  getPlaybackState,
} = require("../controllers/playbackController");
const { protectRoute } = require("../middleware/authMiddleware");
const router = Router();
router.post("/play", protectRoute, playBook);
router.post("/pause", protectRoute, pauseBook);
router.get("/state", protectRoute, getPlaybackState);

module.exports = router;
