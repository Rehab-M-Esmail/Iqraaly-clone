const express = require("express");
const {
  getAllBooks,
  getBookById,
  searchBooks,
  getRecentBooks,
} = require("../controllers/bookController");
const {
  authenticateJWT,
  protectRoute,
  requireAdmin,
} = require("../middleware/authMiddleware");
//const { Book } = require("../models/bookModel");
const router = express.Router();
router.get("/", authenticateJWT, requireAdmin, getAllBooks); //checked
router.get("/search", searchBooks); //checked
router.get("/recent", getRecentBooks); //Ok but no books where retreived
router.get("/:id", getBookById); //checked

module.exports = router;
