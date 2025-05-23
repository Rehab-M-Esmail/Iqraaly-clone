const { Book, Review } = require("../models/bookModel");
const { BookSeries } = require("../models/bookseriesModel");
async function getAllBooks(req, res) {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error in getAllBooks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getBookById(req, res) {
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
}

async function searchBooks(req, res) {
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
}

async function getRecentBooks(req, res) {
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
}
async function addReview(req, res) {
  try {
    const { user, comment, book_id } = req.body;
    if (!user || !comment || !book_id)
      console.log("Missing argument to add a review");
    const review = new Review({ user, comment });
    const book = await Book.findById(book_id);
    if (!book) {
      throw new Error("Book not found"); // Handle the case where the book doesn't exist.
    }
    book.reviews.push(review);
    const updatedBook = await book.save();
    console.log(`Your updated Book is ${updatedBook}`);
    res.status(200).send(updatedBook);
  } catch (error) {
    console.log("Error adding review", error);
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  searchBooks,
  getRecentBooks,
  addReview,
};
