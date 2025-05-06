const express = require("express");
const {
  getAllBooks,
  getBookById,
  searchBooks,
  getRecentBooks,
} = require("../controllers/bookController");
const {
  authenticateJWT,
  verifyAdmin,
} = require("../middleware/authMiddleware");
const { Book } = require("../models/bookModel");
const router = express.Router();

router.get("/", authenticateJWT, verifyAdmin, getAllBooks);
router.get("/search", authenticateJWT, verifyAdmin, searchBooks);
router.get("/recent", authenticateJWT, getRecentBooks);
router.get("/:id", getBookById);

module.exports = router;
