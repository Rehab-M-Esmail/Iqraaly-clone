// Test data creation script for your application
// Run this script to populate your database with test data

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Import models
const { User } = require('./src/models/userModel');
const { Book } = require('./src/models/bookModel');
const { BookSeries } = require('./src/models/bookseriesModel');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/audiobooks')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Test data
const users = [
  {
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    fullName: 'Admin User'
  },
  {
    username: 'user',
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
    fullName: 'Regular User'
  }
];

const bookSeries = [
  {
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    coverImageUrl: '/images/harry-potter.jpg',
    releaseYear: 1997
  },
  {
    title: 'Lord of the Rings',
    author: 'J.R.R. Tolkien',
    coverImageUrl: '/images/lotr.jpg',
    releaseYear: 1954
  },
  {
    title: 'A Song of Ice and Fire',
    author: 'George R.R. Martin',
    coverImageUrl: '/images/got.jpg',
    releaseYear: 1996
  }
];

const books = [
  // Harry Potter books
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    description: "Harry Potter discovers he is a wizard.",
    duration: 28800, // 8 hours in seconds
    rating: 4.8
  },
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
    genre: "Fantasy",
    description: "Harry's second year at Hogwarts.",
    duration: 30600, // 8.5 hours in seconds
    rating: 4.7
  },
  
  // LOTR books
  {
    title: "The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    description: "Frodo's journey begins.",
    duration: 64800, // 18 hours in seconds
    rating: 4.9
  },
  {
    title: "The Two Towers",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    description: "The fellowship is broken.",
    duration: 61200, // 17 hours in seconds
    rating: 4.8
  },
  
  // GOT books
  {
    title: "A Game of Thrones",
    author: "George R.R. Martin",
    genre: "Fantasy",
    description: "The game begins.",
    duration: 108000, // 30 hours in seconds
    rating: 4.9
  },
  {
    title: "A Clash of Kings",
    author: "George R.R. Martin",
    genre: "Fantasy",
    description: "War breaks out in Westeros.",
    duration: 111600, // 31 hours in seconds
    rating: 4.8
  }
];

// Create users
async function createUsers() {
  try {
    // Clear existing users
    await User.deleteMany({});
    
    // Create new users with hashed passwords
    const userPromises = users.map(async user => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return new User({
        ...user,
        password: hashedPassword
      }).save();
    });
    
    await Promise.all(userPromises);
    console.log('Users created successfully');
  } catch (error) {
    console.error('Error creating users:', error);
  }
}

// Create book series and books
async function createBooksAndSeries() {
  try {
    // Clear existing data
    await BookSeries.deleteMany({});
    await Book.deleteMany({});
    
    // Create book series
    const createdSeries = await Promise.all(
      bookSeries.map(series => new BookSeries(series).save())
    );
    
    // Create books and associate with series
    const bookPromises = [];
    
    books.forEach((book, index) => {
      // Assign book to appropriate series
      let seriesIndex;
      if (index < 2) {
        seriesIndex = 0; // Harry Potter
      } else if (index < 4) {
        seriesIndex = 1; // LOTR
      } else {
        seriesIndex = 2; // GOT
      }
      
      const seriesId = createdSeries[seriesIndex]._id;
      
      const newBook = new Book({
        ...book,
        bookseriesId: seriesId
      });
      
      bookPromises.push(newBook.save().then(savedBook => {
        // Update series with book reference
        return BookSeries.findByIdAndUpdate(
          seriesId,
          { $push: { books: savedBook._id } }
        );
      }));
    });
    
    await Promise.all(bookPromises);
    console.log('Books and series created successfully');
  } catch (error) {
    console.error('Error creating books and series:', error);
  }
}

// Run the setup
async function setupTestData() {
  try {
    await createUsers();
    await createBooksAndSeries();
    console.log('Test data setup complete!');
    
    // Print credentials for testing
    console.log('\nTest Credentials:');
    console.log('Admin: admin@example.com / admin123');
    console.log('User: user@example.com / user123');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error setting up test data:', error);
    mongoose.connection.close();
  }
}

setupTestData();