const Product = require('../models/Product');

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

module.exports = { getProducts };
