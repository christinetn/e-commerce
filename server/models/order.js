const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    card: {
        type: Number,
        required: true
    },
    cvc: {
        type: Number,
        required: true
    },
    shipping: {
        type: String,
        required: true
    },
    cartContents: {
        type: [Object],
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;