// models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['HEALTH', 'SPORTS', 'TECH', 'DESIGN', 'CLIMATE']
  },
  image: { type: String, required: true },
  description: { type: String, required: true },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);