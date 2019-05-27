const express = require('express');
const cors = require('cors');

const app = express();

// fix cors
app.use(cors());
// body-parser built in express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// items endpoint
app.use('/api/items', require('./routes/item'));

module.exports = app;
