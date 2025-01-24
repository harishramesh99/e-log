// controllers/authController.js 
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const defaultCategories = ['HEALTH', 'SPORTS', 'TECH', 'DESIGN', 'CLIMATE'];

exports.getSignIn = (req, res) => {
    console.log('CSRF Token in getSignIn:', req.csrfToken());
    res.render('signin', { 
      csrfToken: req.csrfToken(),
      currentPage: 'signin'
    });
  };
  
  exports.getSignUp = (req, res) => {
    res.render('signup', { 
      categories: res.locals.categories || [],
      currentPage: 'signup'
    });
  };

exports.postSignIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
      return res.render('/signin', { error: 'Invalid credentials', categories: defaultCategories });
    }
    req.session.user = user;
    req.session.isAuthenticated = true;
    res.redirect('/');
  } catch (error) {
    res.render('/signin', { error: error.message, categories: defaultCategories });
  }
};

exports.postSignUp = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({...req.body, password: hashedPassword});
    res.redirect('/signin');
  } catch (error) {
    res.render('signup', { error: error.message, categories: defaultCategories });
  }
};

exports.signOut = (req, res) => {
  req.session.destroy();
  res.redirect('/signout');
  console.log('User signed out');
};