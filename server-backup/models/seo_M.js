const mongoose = require('mongoose');

// SEO modelini tanımla
const seoSchema = new mongoose.Schema({
    page: {type: String,required: true,unique: true /* Her sayfa için yalnızca bir SEO bilgisi olacak*/ },
    metaDescription: {type: String,required: true },
    metaKeywords: { type: String, required: true }
});

const SEO = mongoose.model('SEO', seoSchema);

module.exports = SEO;
