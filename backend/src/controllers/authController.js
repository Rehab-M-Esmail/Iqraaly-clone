const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_KEY = process.env.SECRET_KEY || "your_jwt_secret";

const register = async (req, res) => {
  console.log("From register in auth.controller");
  const { username, email, password, role, fullName } = req.body;
  try {
    const existingUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message:
          existingUser.username === username
            ? "Username already exists"
            : "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
      fullName: fullName || username,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error in register:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  console.log("From login in auth.controller", SECRET_KEY);
  console.log(req.body);
  const { email, password } = req.body;
  try {
    let user;

    if (email) {
      user = await User.findOne({ email });
    } else {
      return res.status(400).json({ message: " email is required" });
    }

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  register,
  login,
};
