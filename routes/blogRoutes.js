const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const blogController = require('../controller/blogController');

const { isAuth } = require('../middleware/auth');

// Static routes first
router.get('/write', isAuth, blogController.getWritePage);
router.post('/write', isAuth, blogController.createBlog);
// API routes
router.get('/api/blogs', blogController.getAllBlogs);
router.post('/api/blogs', blogController.createBlog);
router.delete('/api/blogs/:id', isAuth, blogController.deleteBlog);

// Home page
router.get('/', blogController.getHomePage);

// Details page with ID validation
router.get('/details/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).render('error', { 
      error: 'Invalid blog ID',
      categories: []
    });
  }
  next();
}, blogController.getArticleDetails);

// Category page last
router.get('/:category', blogController.getCategoryPage);

module.exports = router;