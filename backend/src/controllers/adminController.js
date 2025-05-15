const { Book } = require("../models/bookModel");
const { BookSeries } = require("../models/bookseriesModel");

const createBook = async (req, res, next) => {
  try {
    const { title, author, duration, genre } = req.body;
    console.log(title);
    const newBook = new Book({
      title,
      author,
      genre: genre || "Unknown",
      duration,
      bookseriesId: null,
    });

    const savedBook = await newBook.save();

    // if (bookseriesId) {
    //   await BookSeries.findByIdAndUpdate(bookseriesId, {
    //     $push: { books: savedBook._id },
    //   });
    // }

    res.status(201).json(savedBook);
  } catch (error) {
    console.error("Error in createBook:", error);
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.bookseriesId) {
      await BookSeries.findByIdAndUpdate(book.bookseriesId, {
        $pull: { books: book._id },
      });
    }

    await Book.findByIdAndDelete(id);

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error in deleteBook:", error);
    next(error);
  }
};

const checkAdmin = (req, res) => {
  res.status(200).json({ admin: true });
};

module.exports = {
  createBook,
  deleteBook,
  checkAdmin,
};
