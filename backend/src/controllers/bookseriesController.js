const { BookSeries } = require("../models/bookseriesModel");

const getAllBooks = async (req, res) => {
  try {
    const bookSeries = await BookSeries.find().populate("books");

    res.status(200).json(bookSeries);
  } catch (error) {
    console.error("Error in getAllBooks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBookById = async (req, res) => {
  const { BookId } = req.params;

  try {
    const bookSeries = await BookSeries.findById(BookId).populate("books");

    if (!bookSeries) {
      return res.status(404).json({ message: "Book Series not found" });
    }

    res.status(200).json(bookSeries);
  } catch (error) {
    console.error("Error in getBookById:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getAllBooks, getBookById };
