const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const DATA_FILE = path.join(__dirname, '../Database/audiobook.json');

// Helper functions
const readData = () => {
    const rawData = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(rawData);
};

const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
};

// Get all books
router.get('/', (req, res) => {
    try {
        const data = readData();
        res.json(data.books);
    } catch (err) {
        res.status(500).send('Error fetching books');
    }
});

// Get a specific book by ID
router.get('/:id', (req, res) => {
    try {
        const data = readData();
        const book = data.books.find(book => book.id === req.params.id);
        if (!book) return res.status(404).send('Book not found');
        res.json(book);
    } catch (err) {
        res.status(500).send('Error fetching book');
    }
});

// Add a new book
router.post('/', (req, res) => {
    try {
        const data = readData();
        const newBook = {
            id: Date.now().toString(), // Generate simple ID
            ...req.body
        };
        data.books.push(newBook);
        writeData(data);
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).send('Error saving book');
    }
});

// Update a book
router.put('/:id', (req, res) => {
    try {
        const data = readData();
        const bookIndex = data.books.findIndex(book => book.id === req.params.id);
        if (bookIndex === -1) return res.status(404).send('Book not found');
        
        data.books[bookIndex] = { ...data.books[bookIndex], ...req.body };
        writeData(data);
        res.json(data.books[bookIndex]);
    } catch (err) {
        res.status(400).send('Error updating book');
    }
});

// Delete a book
router.delete('/:id', (req, res) => {
    try {
        const data = readData();
        const bookIndex = data.books.findIndex(book => book.id === req.params.id);
        if (bookIndex === -1) return res.status(404).send('Book not found');
        
        const deletedBook = data.books.splice(bookIndex, 1);
        writeData(data);
        res.json(deletedBook);
    } catch (err) {
        res.status(400).send('Error deleting book');
    }
});

module.exports = router;
