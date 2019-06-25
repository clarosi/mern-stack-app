const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// fix cors
app.use(cors());
// body-parser built in express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// end points
app.use('/api/items', require('./routes/item'));
app.use('/api/users', require('./routes/user'));

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
//   app.get('*', (_, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

module.exports = app;
