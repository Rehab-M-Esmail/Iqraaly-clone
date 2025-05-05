const express = require("express");
const { getAllBooks, getBookById, searchBooks, getRecentBooks } = require("../controllers/book.controller");
const { authenticateJWT, verifyAdmin } = require("../middleware/auth.middleware");
const { Book } = require("../models/book.model");
const router = express.Router();

router.get("/", authenticateJWT, verifyAdmin, getAllBooks);
router.get("/search", authenticateJWT, verifyAdmin, searchBooks);
router.get("/recent", authenticateJWT, getRecentBooks);
router.get("/:id", getBookById);

module.exports = router;