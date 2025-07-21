const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct } = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');

router.get('/', getAllProducts);
router.post('/', protect, createProduct); // protected route

module.exports = router;
