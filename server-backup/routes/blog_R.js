const express = require('express');
const { getAllBlogs, getBlogById, createBlog } = require('../controllers/blog_C');
const router = express.Router();

// Tüm blog yazılarını getir
router.get('/blogs', getAllBlogs);

// Blog yazısına id ile ulaş
router.get('/blogs/:id', getBlogById);

router.post('/blogs', createBlog);

module.exports = router;
