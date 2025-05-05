const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth.middleware");
const { Favorite } = require("../models/favorite.model");
router.get("/:bookId", authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;
    
    const favorite = await Favorite.findOne({ userId, bookId });
    res.status(200).json({ isFavorite: !!favorite });
  } catch (error) {
    console.error("Error checking favorite:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/:bookId", authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;
    
    const existingFavorite = await Favorite.findOne({ userId, bookId });
    if (existingFavorite) {
      await Favorite.deleteOne({ userId, bookId });
      res.status(200).json({ isFavorite: false });
    } else {
      await Favorite.create({ userId, bookId });
      res.status(201).json({ isFavorite: true });
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;