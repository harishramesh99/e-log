// server.js
require('dotenv').config();
const express = require('express');
// const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db');
const Navigation = require('./models/navigation');

const app = express();

// Connect to MongoDB
connectDB();

// EJS setup
// app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Static files
app.use(express.static('public'));

// Routes (will be added later)
app.get('/', async (req, res) => {
    try {
        const navItems = await Navigation.find({ position: 'header' })
            .sort('order');
        const footerItems = await Navigation.find({ position: 'footer' })
            .sort('order');
        
        res.render('home', {
            navItems,
            footerItems
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));