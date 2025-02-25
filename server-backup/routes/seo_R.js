const express = require('express');
const { getSeoByPage, createSeo } = require('../controllers/seo_C');
const router = express.Router();

// SEO bilgilerini sayfaya göre al
router.get('/seo/:page', getSeoByPage);

// Yeni SEO bilgisi ekle
router.post('/seo', createSeo);

module.exports = router;
