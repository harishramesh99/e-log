// routes/product.js
const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/auth');
const productController = require('../controller/productcontroller');

// All routes just need user authentication
router.get('/add-product', isAuth, productController.getAddProduct); // Added this route
router.post('/add-product', isAuth, productController.createProduct);
router.get('/edit-product/:id', isAuth, productController.getEditProduct);
router.post('/edit-product', isAuth, productController.updateProduct);
router.post('/delete-product/:id', isAuth, productController.deleteProduct);

module.exports = router;