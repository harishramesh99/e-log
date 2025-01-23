const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');



router.delete('/api/blogs/:id', blogController.deleteBlog);
// Home page
router.get('/', blogController.getHomePage);

// Article details (specific route before category route)
router.get('/details/:id', blogController.getArticleDetails);

// Category page
router.get('/:category', blogController.getCategoryPage);

// API routes
router.post('/api/blogs', blogController.createBlog);
router.get('/api/blogs', blogController.getAllBlogs);
// Delete a blog by ID


module.exports = router;
