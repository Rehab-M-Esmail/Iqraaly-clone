const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    fullName: { type: String, required: true },
    profilePhoto: { type: String, default: "/images/default.jpg" },
    bio: { type: String, default: "Tell us about yourself!" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = { User };
