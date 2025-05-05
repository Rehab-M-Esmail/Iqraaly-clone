const { Router } = require("express");
const { getBookById, getAllBooks } = require("../controllers/bookseries.controller");
const router = Router();
router.get("/", getAllBooks);
router.get("/:BookId", getBookById);
module.exports = router;