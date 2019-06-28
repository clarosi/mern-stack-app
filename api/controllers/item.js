const Item = require('../models/item');
const { errObj } = require('../../shared/utils');
const { SERVER_ERR_CODE } = require('../../shared/numbers');
const { UNAUTHORIZED_USR_ERR } = require('../../shared/strings');

module.exports.getItems = (req, res) => {
  Item.find({ userId: req.user._id })
    .sort({ createdAt: -1 })
    .then(items => res.json(items))
    .catch(error => res.status(SERVER_ERR_CODE).json(errObj(error)));
};

module.exports.addItem = (req, res) => {
  const { name } = req.body;
  const newItem = new Item({ userId: req.user._id, name });

  newItem
    .save()
    .then(item => res.json(item))
    .catch(error => res.status(SERVER_ERR_CODE).json(errObj(error)));
};

module.exports.updateItem = (req, res) => {
  const { name } = req.body;
  const { user, params } = req;

  Item.findOne({ userId: user._id, _id: params._id })
    .then(item => {
      if (!item) throw UNAUTHORIZED_USR_ERR;

      item
        .updateOne({ name })
        .then(item => res.json(item))
        .catch(error => error);
    })
    .catch(error => res.status(SERVER_ERR_CODE).json(errObj(error)));
};

module.exports.deleteItem = (req, res) => {
  const { user, params } = req;

  Item.findOne({ userId: user._id, _id: params._id })
    .then(item => {
      if (!item) throw UNAUTHORIZED_USR_ERR;

      item
        .deleteOne()
        .then(item => res.json(item))
        .catch(error => error);
    })
    .catch(error => res.status(SERVER_ERR_CODE).json(errObj(error)));
};
