const express = require("express");
const {
  getAllBooks,
  getBookById,
  searchBooks,
  getRecentBooks,
  addReview,
} = require("../controllers/bookController");
const {
  authenticateJWT,
  protectRoute,
  requireAdmin,
} = require("../middleware/authMiddleware");
//const { Book } = require("../models/bookModel");
const router = express.Router();
router.get("/", authenticateJWT, requireAdmin, getAllBooks); //checked
router.get("/search", authenticateJWT, requireAdmin, searchBooks);
router.get("/recent", authenticateJWT, getRecentBooks); //Ok but no books where retreived
router.get("/:id", getBookById); //checked
router.post("/review", addReview);

module.exports = router;
