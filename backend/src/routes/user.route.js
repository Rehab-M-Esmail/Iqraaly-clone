const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/auth.middleware");
const { updateProfile } = require("../controllers/user.controller");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/images/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.put("/me", authenticateJWT, upload.single("profilePhoto"), updateProfile);

module.exports = router;