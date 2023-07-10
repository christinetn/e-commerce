const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    reviews: {
        type: Number,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    description: {
        type: [String],
        required: true
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
