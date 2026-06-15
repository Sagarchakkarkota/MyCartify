const express = require('express');
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/', productController.getProducts);
router.get('/search', productController.searchProducts);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/categories', categoryController.getProductCategories);
router.get('/:id', productController.getProductById);

module.exports = router;

