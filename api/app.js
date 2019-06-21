const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// fix cors
app.use(cors());
// body-parser built in express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// items endpoint
app.use('/api/items', require('./routes/item'));

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
//   app.get('*', (_, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

module.exports = app;
