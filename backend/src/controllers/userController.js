const { User } = require("../models/userModel");
const path = require("path");

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, bio } = req.body;
    const profilePhoto = req.file ? `/images/${req.file.filename}` : undefined;

    const updateData = { fullName, bio };
    if (profilePhoto) updateData.profilePhoto = profilePhoto;

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      select: "-password",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
