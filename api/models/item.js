const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 100
    }
  },
  { timestamps: true }
);

//const Item = mongoose.model('Items', itemSchema);
module.exports = Item = mongoose.model('Items', itemSchema);
