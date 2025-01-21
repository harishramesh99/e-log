// models/Navigation.js
const mongoose = require('mongoose');

const navigationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    position: {
        type: String,
        enum: ['header', 'footer'],
        required: true
    },
    section: {
        type: String,
        default: 'main'
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Navigation', navigationSchema);