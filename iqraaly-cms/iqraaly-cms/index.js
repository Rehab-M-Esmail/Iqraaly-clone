const express = require('express');
const app = express();
require('dotenv').config();

const routes = require('./routes');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Iqraaly CMS running on port ${PORT}`);
});