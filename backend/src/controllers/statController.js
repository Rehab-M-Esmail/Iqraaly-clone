const { Book } = require("../models/bookModel");
const { User } = require("../models/userModel");
const { Playback } = require("../models/playbackModel");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const totalUsers = await User.countDocuments();
    const activeListeners = await Playback.countDocuments({
      status: "playing",
    });

    res.status(200).json({
      totalBooks,
      totalUsers,
      activeListeners,
      recentActivity: [],
    });
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
