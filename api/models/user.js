const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 100
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 5,
      maxLength: 100,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 100
    }
  },
  { timestamps: true }
);

//const Item = mongoose.model('User', userSchema);
module.exports = Item = mongoose.model('User', userSchema);
