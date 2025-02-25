const mongoose = require('mongoose');

// Blog Yazı Schema
const blogSchema = new mongoose.Schema({
    title: {type: String, required: true,},
    content: {type: String,required: true,},
    image: { type: String, /* Blog yazısına ait resim*/ },
    author: { type: String, required: true, },
    keywords: [String], // SEO anahtar kelimeleri
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', /*Blog kategori ilişkisi*/ },
    createdAt: { type: Date, default: Date.now, },
});

module.exports = mongoose.model('Blog', blogSchema);
