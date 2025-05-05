const { Playback } = require("../models/playback.model");

exports.playBook = async (req, res, next) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;
    
    const playback = await Playback.findOneAndUpdate(
      { userId },
      { bookId, status: "playing", updatedAt: Date.now() },
      { new: true, upsert: true }
    );
    
    res.status(200).json({ message: "Playback started", playback });
  } catch (error) {
    console.error("Error in playBook:", error);
    next(error);
  }
};

exports.pauseBook = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const playback = await Playback.findOneAndUpdate(
      { userId },
      { status: "paused", updatedAt: Date.now() },
      { new: true }
    );
    
    res.status(200).json({ message: "Playback paused", playback });
  } catch (error) {
    console.error("Error in pauseBook:", error);
    next(error);
  }
};

exports.getPlaybackState = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const playback = await Playback.findOne({ userId }).populate("bookId");
    
    if (!playback) {
      return res.status(404).json({ message: "No active playback" });
    }
    
    res.status(200).json(playback);
  } catch (error) {
    console.error("Error in getPlaybackState:", error);
    next(error);
  }
};