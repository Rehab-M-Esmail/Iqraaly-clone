const express = require("express");
const router = express.Router();
const { login, register } = require('../controllers/auth.controller');

router.post("/register", register);
router.post("/login", login);

router.get("/test", (req, res) => {
  res.status(200).json({ message: "Auth routes are accessible" });
});

module.exports = router;