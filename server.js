const mongoose = require('mongoose');
const app = require('./api/app');

// connect to mongodb
let uri = `mongodb://localhost:27017/${process.env.DB_NAME}`;

if (process.env.NODE_ENV === 'production') {
  uri = `mongodb+srv://${process.env.USER_NAME}:${
    process.env.PASSWORD
  }@node-rest-shop-f6q6v.mongodb.net/${process.env.DB_NAME}?retryWrites=true`;
}

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running at port:${PORT}`);
    });
  })
  .catch(error => console.log(error));
