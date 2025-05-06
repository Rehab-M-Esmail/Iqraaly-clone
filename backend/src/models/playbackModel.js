const mongoose = require("mongoose");
const playbackSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    status: {
      type: String,
      enum: ["playing", "paused", "stopped"],
      default: "stopped"
    },
  },
  { timestamps: true }
);
const Playback = mongoose.model("Playback", playbackSchema);
module.exports = { Playback };