const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  comment: { type: String, required: true },
});

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: "available", enum: ["available", "unavailable"] },
  rating: { type: Number, default: 4.5 },
  reviews: [reviewSchema],
  audioUrl: { type: String },
  duration: { type: Number },
  bookseriesId: { type: mongoose.Schema.Types.ObjectId, ref: "BookSeries" }
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);
module.exports = { Book };