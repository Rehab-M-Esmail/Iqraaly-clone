const mongoose = require('mongoose');
 const connectToDatabase = async () => {
 try {
     await mongoose.connect(process.env.MONGOOSE_URI_BOOK);
     console.log('Database Connected!');
 } catch (err) {
     console.error('Database Connection Failed:', err);
     process.exit(1);
 }
 };
 module.exports = connectToDatabase;