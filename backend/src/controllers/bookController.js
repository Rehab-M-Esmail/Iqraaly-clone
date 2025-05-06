const { Book } = require("../models/bookModel");
const { BookSeries } = require("../models/bookseriesModel");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error in getAllBooks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const series = await BookSeries.findOne({ books: id });
    const bookDetails = {
      ...book._doc,
      image: series ? series.coverImageUrl : "/images/default.jpg",
      author: {
        id: "a1",
        name: book.author,
        photo: "/images/author.jpg",
        bio: "Author bio placeholder.",
      },
      reader: {
        id: "r1",
        name: "Reader Name",
        photo: "/images/reader.jpg",
        bio: "Reader bio placeholder.",
      },
    };

    res.status(200).json(bookDetails);
  } catch (error) {
    console.error("Error fetching book details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const bookSeries = await BookSeries.find().populate("books");
    const allBooks = bookSeries.flatMap((series) => series.books);
    const results = allBooks.filter((book) =>
      book.title.toLowerCase().includes(query.toString().toLowerCase())
    );

    res.status(200).json(results);
  } catch (error) {
    console.error("Error in search:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getRecentBooks = async (req, res) => {
  try {
    const bookSeries = await BookSeries.find().populate("books");
    const allBooks = bookSeries.flatMap((series) => series.books);
    const recentBooks = allBooks
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    const result = recentBooks.map((book) => {
      const series = bookSeries.find((s) =>
        s.books.some((b) => b._id.toString() === book._id.toString())
      );
      return {
        ...book._doc,
        seriesCoverImage: series ? series.coverImageUrl : "/images/default.jpg",
      };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in getRecentBooks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  searchBooks,
  getRecentBooks,
};
