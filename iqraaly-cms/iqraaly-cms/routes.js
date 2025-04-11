const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/podcasts', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Podcasts');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/podcasts', async (req, res) => {
  const { title, host, genre } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO Podcasts (title, host, genre) VALUES ($1, $2, $3) RETURNING *',
      [title, host, genre]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;