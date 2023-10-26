const mongoose = require('mongoose');

// Define the product schema
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a product name"]
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: false,
    }
});

// Create a product model
const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel; // Changed variable name from 'product' to 'ProductModel'
