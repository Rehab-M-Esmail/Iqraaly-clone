const mongoose = require("mongoose");

const bookSeriesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    coverImageUrl: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  },
  { timestamps: true }
);

const BookSeries = mongoose.model("BookSeries", bookSeriesSchema);

module.exports = { BookSeries };