require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const Blog = require('./models/blogs');
const blogRoute = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const app = express();

const store = new MongoDBStore({
 uri: process.env.MONGODB_URI,
 collection: 'sessions'
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Order matters for middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, 
  saveUninitialized: false,
  store: store,
  cookie: {
    httpOnly: true,
    secure: true, // Set to true in production
    sameSite: 'strict'
  }
}));

app.use(csrf());

// Global middleware
app.use((req, res, next) => {
 res.locals.categories = Blog.schema.path('category').enumValues;
 res.locals.isAuthenticated = req.session.isAuthenticated;
 res.locals.user = req.session.user;
 res.locals.csrfToken = req.csrfToken();
 res.locals.isAuthPage = req.path === '/signin' || req.path === '/signup';
 console.log('CSRF Token:', req.csrfToken());
 next();
});

connectDB();

app.use(blogRoute);
app.use(authRoutes);
app.use((error, req, res, next) => {
 res.status(500).render('error', { 
   error: error.message || 'Something went wrong!'
 });
});

app.listen(3000, () => console.log('Server running on 3000'));