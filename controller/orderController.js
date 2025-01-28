// controllers/orderController.js
const Order = require('../models/order');

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user._id,
      products: req.body.products,
      totalAmount: req.body.totalAmount
    });
    res.redirect('/orders/' + order._id);
  } catch (error) {
    res.status(500).render('error', { error });
  }
};