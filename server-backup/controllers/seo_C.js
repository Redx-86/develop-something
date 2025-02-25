const SEO = require('../models/seo_M');

// SEO bilgilerini sayfaya göre getir
const getSeoByPage = async (req, res) => {
    try {
        const page = req.params.page;
        const seoData = await SEO.findOne({ page });

        if (!seoData) {
            return res.status(404).json({ message: 'SEO bilgisi bulunamadı' });
        }

        res.status(200).json(seoData);
    } catch (error) {
        res.status(500).json({ message: 'SEO bilgisi alınırken bir hata oluştu', error });
    }
};

// Yeni SEO bilgisi ekle
const createSeo = async (req, res) => {
    try {
        const { page, metaDescription, metaKeywords } = req.body;
        const newSeo = new SEO({
            page,
            metaDescription,
            metaKeywords
        });

        const savedSeo = await newSeo.save();
        res.status(201).json(savedSeo);
    } catch (error) {
        res.status(500).json({ message: 'SEO bilgisi eklenirken bir hata oluştu', error });
    }
};

module.exports = { getSeoByPage, createSeo };
