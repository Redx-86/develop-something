const Category = require('../models/category_M');

// Tüm kategorileri al
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Kategoriler alınırken bir hata oluştu', error });
    }
};

// Tek bir kategoriyi id ile al
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Kategori bulunamadı' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Kategori alınırken bir hata oluştu', error });
    }
};


const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCategory = new Category({
            name,
            description
        });

        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Kategori eklenirken bir hata oluştu', error });
    }
};


module.exports = { getAllCategories, getCategoryById, createCategory };
