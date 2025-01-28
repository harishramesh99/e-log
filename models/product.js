// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  category: { 
    type: String, 
    required: true,
    enum: ['HEALTH', 'SPORTS', 'TECH', 'DESIGN', 'CLIMATE'] // Same as Blog categories
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);