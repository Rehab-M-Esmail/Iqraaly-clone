const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());
const SECRET_KEY = process.env.SECRET_KEY || 'your_jwt_secret';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/jwt-auth';
const User = require('./models/User');

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log(' Connected to MongoDB'))
  .catch(err => console.error(' MongoDB connection error:', err));

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).send('Invalid credentials');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).send('Invalid credentials');
    
    
    if (user.role !== 'admin') {
      return res.status(401).json({ message: 'Invalid role' });
    }
    
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Extract token
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403); 
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); 
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ message: 'Access denied. You need an Admin role to get access.' });
  }
  next();
};

app.get('/admin', authenticateJWT, verifyAdmin, (req, res) => {
  const { username } = req.user;
  res.send(`This is an Admin Route. Welcome ${username}`);
});

app.get('/protected', authenticateJWT, (req, res) => {
  res.send(`Hello ${req.user.username}, you have accessed a protected route!`);
});

app.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const user = new User({
        username,
        password: hashedPassword,
        role: role || 'user'
      });
      
      await user.save();
      
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
