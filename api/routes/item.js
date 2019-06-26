const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

// Get items
router.get('/', auth, require('../controllers/item').getItems);

// Add item
router.post('/', auth, require('../controllers/item').addItem);

// Update item
router.put('/:_id', auth, require('../controllers/item').updateItem);

// Delete item
router.delete('/:_id', auth, require('../controllers/item').deleteItem);

module.exports = router;
