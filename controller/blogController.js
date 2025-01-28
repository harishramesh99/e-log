// controllers/blogController.js
const Blog = require('../models/blogs');
const Product = require('../models/product');

exports.getCategories = () => {
    return Blog.schema.path('category').enumValues; // Retrieves enum values for the `category` field
  };

  exports.getHomePage = async (req, res) => {
    try {
      const categories = Blog.schema.path('category').enumValues; // Fetch categories dynamically
      const [featured, healthArticles, sportsArticles] = await Promise.all([
        Blog.find({ featured: true }).limit(4),
        Blog.find({ category: 'HEALTH' }).sort('-createdAt').limit(3),
        Blog.find({ category: 'SPORTS' }).sort('-createdAt').limit(4)
      ]);
  
      res.render('home', {
        featured,
        healthArticles,
        sportsArticles,
        categories // Pass categories to the template
      });
    } catch (error) {
      res.status(500).render('error', { error });
    }
  };
  
  exports.getCategoryPage = async (req, res) => {
    try {
      const categories = Blog.schema.path('category').enumValues; // Fetch categories dynamically
      const articles = await Blog.find({ 
        category: req.params.category.toUpperCase() 
      }).sort('-date');
      
      res.render('category', {
        sectionTitle: req.params.category,
        articles,
        categories // Pass categories to the template
      });
    } catch (error) {
      res.status(500).render('error', { error });
    }
  };

  // blogController.js
exports.getArticleDetails = async (req, res) => {
  try {
      const article = await Blog.findById(req.params.id);
      if (!article) {
          return res.status(404).render('404', {
              pageTitle: 'Article Not Found',
              path: '/404'
          });
      }

      // Get categories for navigation
      const categories = Blog.schema.path('category').enumValues;
      
      // Get related articles in the same category
      const relatedArticles = await Blog.find({
          category: article.category,
          _id: { $ne: article._id }
      }).limit(3);

      // Get suggested products based on article category
      const suggestedProducts = await Product.find({
          category: article.category // Assuming product categories match blog categories
      }).limit(4);

      res.render('details', { 
          article,
          relatedArticles,
          suggestedProducts, // Add suggested products to the view
          categories,
          pageTitle: article.title,
          currentPage: 'blog'
      });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).render('error', { 
          error: error.message,
          categories: Blog.schema.path('category').enumValues
      });
  }
};


// API endpoints
// blogController.js
// blogController.js
exports.createBlog = async (req, res) => {
    try {
      const blogData = {
        ...req.body,
        author: req.session.user._id, // Add author ID
        image: `/img/${req.body.image}${!req.body.image.endsWith('.jpg') ? '.jpg' : ''}`
      };
      const blog = await Blog.create(blogData);
      res.redirect('/details/' + blog._id);
    } catch (error) {
      res.render('write', { 
        categories: Blog.schema.path('category').enumValues,
        error: error.message 
      });
    }
  };
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort('-date');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBlog = await Blog.findByIdAndDelete(id);
  
      if (!deletedBlog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
  
      res.status(200).json({ message: 'Blog deleted successfully', deletedBlog });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
// blogController.js
exports.getWritePage = async (req, res) => {
    const categories = ['HEALTH', 'SPORTS', 'TECH', 'DESIGN', 'CLIMATE'];
    res.render('write', { categories });
   };