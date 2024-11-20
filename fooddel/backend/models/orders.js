const mongoose = require('mongoose');

// Define the schema for an order
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Link to the User model
        required: true,
        ref: 'User', // Referencing the User model
    },
    items: [{
        id: {
            type: mongoose.Schema.Types.ObjectId, // Link to the Product model
            required: true,
            ref: 'fooditems', // Assuming you have a Product model to track individual items
        },
        name: {
            type: String,
            required: true,
        },
        qty: {
            type: Number,
            required: true,
            default: 1, // Default quantity is 1
        },
        price: {
            type: Number,
            required: true,
        },
        size: {
            type: String, // Size or any other specific detail related to the product
            required: false,
        },
    }],
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Credit Card', 'Debit Card', 'Cash on Delivery', 'Online Transfer'], // List the accepted payment methods
        default: 'Cash on Delivery',
    },
    orderStatus: {
        type: String,
        required: true,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Canceled'], // Order status
        default: 'Pending',
    },
    orderDate: {
        type: Date,
        default: Date.now, // Automatically sets the current date and time when the order is created
    },
    deliveryAddress: {
        type: String,
        required: true, // You can add more fields for address such as city, postal code, etc.
    },
    contactInfo: {
        email: {
            type: String,
            required: true,
        },
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
