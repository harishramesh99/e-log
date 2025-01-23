// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const blogRoute = require('./routes/blogRoutes');

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));

app.use(express.json());
connectDB();

// Routes
app.use(blogRoute);

// Error handling
app.use((error, req, res, next) => {
  res.status(500).render('error', { 
    error: error.message || 'Something went wrong!'
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));