const express = require("express");
const {
  checkAdmin,
  createBook,
  deleteBook,
} = require("../controllers/adminController");
const {
  authenticateJWT,
  protectRoute,
  requireAdmin,
} = require("../middleware/authMiddleware");
const router = express.Router();
//router.use();
router.get("/check", protectRoute, checkAdmin); //checked
router.post("/books", protectRoute, requireAdmin, createBook); //checked
router.delete("/books/:id", protectRoute, requireAdmin, deleteBook); //checked

module.exports = router;
