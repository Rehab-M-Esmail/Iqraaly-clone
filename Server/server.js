const express = require('express');
const Mongoose = require('mongoose');
var CircularJSON = require('circular-json');
import '../Database/audiobook.json' assert { type: 'json' };
import { Book } from './models/BookModel.js';
//Link to be added later
Mongoose.connect(""
).then(()=>{
    console.log("done Connecting with database")
}).catch(()=>{
    console.log("Error with connecting to database");
})
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./Database/audiobook.json', 'utf8'));
const router = express.Router();
router.get('/',async (req, res)=> {
        const Books = await Book.find() ;
        res.send(CircularJSON.stringify(Books));
    })
router.get('/:id',async (req, res)=> {
        const Book = await data.find((book) => book.id == req.params.id);
        if (!Book) {
            return res.status(404).send('Book not found');
        }
        res.send(CircularJSON.stringify(Book));
    })
router.post('/', async (req, res) => {
    const { title, type, author, narrator, duration, audioFileUrl, categories, releaseDate, reviews } = req.body;
    const newBook = new Book({ title, type, author, narrator, duration, audioFileUrl, categories, releaseDate, reviews });
    await newBook.save();
    data["books"].append(newBook);
    fs.writeFileSync('./Database/audiobook.json', JSON.stringify(data, null, 2));
    res.status(201).send(CircularJSON.stringify(newBook));
})
router.put('/:id', async (req, res) => {
    const { title, type, author, narrator, duration, audioFileUrl, categories, releaseDate, reviews } = req.body;
    const updatedBook = await data.findByIdAndUpdate(req.params.id, { title, type, author, narrator, duration, audioFileUrl, categories, releaseDate, reviews }, { new: true });
    if (!updatedBook) {
        return res.status(404).send('Book not found');
    }
    res.send(CircularJSON.stringify(updatedBook));
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});