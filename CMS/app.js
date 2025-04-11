
import express from 'express';
import mongoose from 'mongoose';
import bookRoutes from './routes/bookRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/books', bookRoutes);

mongoose.connect('your-mongodb-uri-here')
    .then(() => {
        console.log('Connected to DB');
        app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
    })
    .catch(err => console.error('DB connection error:', err));
