const Item = require('../models/item');

module.exports.getItems = (_, res) => {
  Item.find()
    .sort({ createAt: -1 })
    .then(items => res.json(items))
    .catch(error => res.status(500).json({ message: error }));
};

module.exports.addItem = (req, res) => {
  const { name } = req.body;
  const newItem = new Item({ name });
  newItem
    .save()
    .then(item => res.json(item))
    .catch(error => res.status(500).json({ message: error }));
};

module.exports.updateItem = (req, res) => {
  const { name } = req.body;
  Item.findById(req.params._id)
    .then(item =>
      item
        .updateOne({ name })
        .then(item => res.json(item))
        .catch(error => error)
    )
    .catch(error => res.status(500).json({ message: error }));
};

module.exports.deleteItem = (req, res) => {
  Item.findById(req.params._id)
    .then(item =>
      item
        .deleteOne()
        .then(item => res.json(item))
        .catch(error => error)
    )
    .catch(error => res.status(500).json({ message: error }));
};
