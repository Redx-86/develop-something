const Blog = require('../models/blog_M');

// Tüm blog yazılarını al
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('category');
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Blog yazıları alınırken bir hata oluştu', error });
    }
};

// Tek bir blog yazısını id ile al
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('category');
        if (!blog) {
            return res.status(404).json({ message: 'Blog yazısı bulunamadı' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Blog yazısı alınırken bir hata oluştu', error });
    }
};


const createBlog = async (req, res) => {
    try {
        const { title, content, image, author, keywords, category, createdAt } = req.body;
        const newBlog = new Blog({
            title,
            content,
            image, 
            author, 
            keywords, 
            category, 
            createdAt
        });

        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(500).json({ message: 'Blog yazısı eklenirken bir hata oluştu', error });
    }
};


module.exports = { getAllBlogs, getBlogById, createBlog };
