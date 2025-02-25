const mongoose = require('mongoose');

// Ürün Schema
const productSchema = new mongoose.Schema({
    name: {type: String,required: true,},
    description: {type: String,required: true,},
    price: {
    type: Number,required: true,},
    image: {type: String, /* resim URL'sirequired: true,*/},
    category: {type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', /* İlişkili kategori modelini referans alır */},
    stock: {type: Number,default: 0,},
    features: [String], /* Ürünün özelliklerini bir array olarak tutabiliriz */
    createdAt: { type: Date, default: Date.now, },
});

module.exports = mongoose.model('Product', productSchema);
