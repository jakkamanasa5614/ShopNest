const Order = require('../models/order');

const placeOrder = async (req, res) => {
  const { items, total, paymentMethod } = req.body;

  try {
    const order = new Order({
      user: req.user._id,
      items,
      total,
      paymentMethod
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { placeOrder, getUserOrders };
