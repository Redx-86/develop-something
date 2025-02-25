const mongoose = require('mongoose');

// Kategori Schema
const categorySchema = new mongoose.Schema({
    name: {type: String,required: true, },
    description: { type: String, },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', /* Alt kategori desteği için */ },
});

module.exports = mongoose.model('Category', categorySchema);
