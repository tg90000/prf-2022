const mongoose = require('mongoose');

let productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: [ 0, "Price must be a non-negative value." ]
        },
        stock: {
            type: Number,
            required: true,
            min: [ 0, "Stock must be a non-negative value."]
        }
    },
    {
        collection: 'products'
    }
);

mongoose.model('product', productSchema);