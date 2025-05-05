const express = require("express");
const { checkAdmin, createBook, deleteBook } = require("../controllers/admin.controller");
const { protectRoute, requireAdmin } = require("../middleware/auth.middleware");
const router = express.Router();
router.use(protectRoute, requireAdmin);
router.get("/check", checkAdmin);
router.post("/books", createBook);
router.delete("/books/:id", deleteBook);

module.exports = router;