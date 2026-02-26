const mongoose = require('mongoose');

// Schema - Object Structure
// Model - Object which will provide us Create/Delete/Update/Read methods for collection/Object

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 1
    },
    img: {
        type: String,
        required: true
    }
});

// save

const Product = mongoose.model('Product', productSchema);

module.exports = Product;