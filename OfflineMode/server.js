const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

let offlineData = [];

app.get('/data', (req, res) => {
  res.json(offlineData);
});


app.post('/data', (req, res) => {
  const newData = req.body;
  offlineData.push(newData);
  res.status(201).json({ message: 'Data saved locally' });
});


app.post('/sync', (req, res) => {
  const dataToSync = req.body;
  res.json({ message: 'Data synced successfully' });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
