
import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
    title: String,
    type: {
        type: String,
        enum: ['audiobook', 'podcast'],
        required: true
    },
    author: String,
    narrator: String,
    duration: Number,
    audioFileUrl: String,
    categories: [String],
    releaseDate: Date,
    reviews: [
        {
            userId: Number,
            rating: Number,
            comment: String
        }
    ]
}, { timestamps: true });

export const Book = mongoose.model('Book', BookSchema);
