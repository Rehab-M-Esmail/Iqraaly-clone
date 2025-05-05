const mongoose = require("mongoose");
const { BookSeries } = require("../src/models/bookseries.model.js");
const { Book } = require("../src/models/book.model.js");

mongoose.connect("mongodb://localhost:27017/audiobooks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    await BookSeries.deleteMany();
    await Book.deleteMany();

    const books = [
      {
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Self Help",
        description: "A guide to building good habits.",
        audioUrl: "/audio/CaughtSample.mp3",
        rating: 4.8,
        reviews: [
          { user: "Sara", comment: "Really changed how I think." },
          { user: "Tom", comment: "Narration was amazing." },
        ],
      },
      {
        title: "The Power of Habit",
        author: "Charles Duhigg",
        genre: "Self Help",
        description: "Understanding the science of habits.",
        audioUrl: "/audio/CaughtSample.mp3",
        rating: 4.5,
        reviews: [
          { user: "Alex", comment: "Very insightful!" },
          { user: "Emma", comment: "Loved the examples." },
        ],
      },
      {
        title: "Dune",
        author: "Frank Herbert",
        genre: "Science Fiction",
        description: "Epic tale of interstellar politics.",
        audioUrl: "/audio/CaughtSample.mp3",
        rating: 4.9,
        reviews: [
          { user: "John", comment: "A sci-fi masterpiece." },
          { user: "Lisa", comment: "Incredible world-building." },
        ],
      },
    ];

    const savedBooks = await Book.insertMany(books);

    const bookSeries = [
        {
          title: "Habit Series",
          author: "James Clear", 
          releaseYear: 2021,
          books: [savedBooks[0]._id, savedBooks[1]._id],
          coverImageUrl: "/images/habit-series.jpg",
        },
        {
          title: "Dune Series",
          author: "Frank Herbert",
          releaseYear: 1965,
          books: [savedBooks[2]._id],
          coverImageUrl: "/images/dune-series.jpg",
        },
      ];
      
    await BookSeries.insertMany(bookSeries);

    console.log("Books and BookSeries seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();