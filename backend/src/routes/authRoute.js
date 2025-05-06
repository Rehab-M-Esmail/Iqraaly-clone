const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register); //checked
router.post("/login", login); //checked

router.get("/test", (req, res) => {
  res.status(200).json({ message: "Auth routes are accessible" });
});

module.exports = router;
