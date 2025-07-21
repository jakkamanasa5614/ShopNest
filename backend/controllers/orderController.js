const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  const { userId, items, totalAmount } = req.body;

  const order = new Order({
    userId,
    items,
    totalAmount,
  });

  await order.save();
  res.status(201).json({ message: 'Order placed successfully' });
};
