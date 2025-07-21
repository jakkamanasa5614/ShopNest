const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
});

module.exports = mongoose.model('Product', productSchema);
