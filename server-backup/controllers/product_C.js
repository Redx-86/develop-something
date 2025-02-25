const Product = require('../models/product_M');
const Category = require('../models/category_M');

// Tüm ürünleri al
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Ürünler alınırken bir hata oluştu', error });
    }
};

// Tek bir ürünü id ile al
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) {
            return res.status(404).json({ message: 'Ürün bulunamadı' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Ürün alınırken bir hata oluştu', error });
    }
};



const createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const newProduct = new Product({
            name,
            description,
            price,
            category
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Ürün eklenirken bir hata oluştu', error });
    }
};

module.exports = { getAllProducts, getProductById, createProduct };
