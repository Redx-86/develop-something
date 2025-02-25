const express = require('express');
const { getAllProducts, getProductById, createProduct } = require('../controllers/product_C');
const router = express.Router();

// Tüm ürünleri getir
router.get('/products', getAllProducts);

// Ürüne id ile ulaş
router.get('/products/:id', getProductById);

router.post('/products',createProduct);

module.exports = router;
