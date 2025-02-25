const express = require('express');
const { getAllCategories, getCategoryById, createCategory } = require('../controllers/category_C');
const router = express.Router();

// Tüm kategorileri getir
router.get('/categories', getAllCategories);

// Kategoriye id ile ulaş
router.get('/categories/:id', getCategoryById);

router.post('/categories', createCategory)

module.exports = router;
