const express = require("express");
const {
  checkAdmin,
  createBook,
  deleteBook,
} = require("../controllers/adminController");
const { protectRoute, requireAdmin } = require("../middleware/authMiddleware");
const router = express.Router();
router.use(protectRoute, requireAdmin);
router.get("/check", checkAdmin);
router.post("/books", createBook);
router.delete("/books/:id", deleteBook);

module.exports = router;
