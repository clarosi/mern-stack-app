const express = require('express');
const router = express.Router();

// Get items
router.get('/', require('../controllers/item').getItems);

// Add item
router.post('/', require('../controllers/item').addItem);

// Update item
router.put('/:_id', require('../controllers/item').updateItem);

// Delete item
router.delete('/:_id', require('../controllers/item').deleteItem);

module.exports = router;
