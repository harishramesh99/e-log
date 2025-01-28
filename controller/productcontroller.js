// productController.js - Updated for Mongoose
const Product = require('../models/product');

// controllers/productController.js

exports.getProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).render('404', {
                pageTitle: 'Product Not Found',
                path: '/404'
            });
        }

        // Find related products with the same category
        const relatedProducts = await Product.find({ 
            _id: { $ne: productId }, // Exclude current product
            category: product.category // Match the category
        })
        .limit(4); // Limit to 4 related products

        res.render('details', {
            pageTitle: product.title,
            product: product,
            relatedProducts: relatedProducts,
            currentPage: 'products',
            isAuthenticated: req.session.isLoggedIn,
            user: req.session.user
        });

    } catch (error) {
        next(error);
    }
};

// Add this to your productController.js
exports.getAddProduct = (req, res, next) => {
    try {
        res.render('addProducts', {  // Make sure this matches your view filename
            pageTitle: 'Add Product',
            currentPage: 'add-product',
            editing: false,
            isAuthenticated: req.session.isLoggedIn,
            user: req.session.user
        });
    } catch (error) {
        next(error);
    }
};

exports.createProduct = (req, res, next) => {
    const product = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,  // Added this
      createdBy: req.session.user._id
    });
    
    product.save()
      .then(result => {
        console.log('CREATED PRODUCT');
        res.redirect('/products');
      })
      .catch(err => {
        console.log(err);
        next(err);  // Added error handling
      });
  };

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.id;  // Changed from productId to match route
  Product.findById(prodId)  // Changed from findByPk to findById
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('addProducts', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
        isAuthenticated: req.session.isLoggedIn,
        user: req.session.user  // Add this to match your template
      });
    })
    .catch(err => console.log(err));
};

exports.updateProduct = (req, res, next) => {  // Renamed from postEditProduct
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      product.title = req.body.title;
      product.price = req.body.price;
      product.description = req.body.description;
      return product.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/products');
    })
    .catch(err => console.log(err));
};

exports.deleteProduct = (req, res, next) => {  // Renamed from postDeleteProduct
  const prodId = req.params.id;  // Changed to match route parameter
  Product.findByIdAndDelete(prodId)  // Changed to Mongoose method
    .then(() => {
      console.log('DELETED PRODUCT');
      res.redirect('/products');
    })
    .catch(err => console.log(err));
};