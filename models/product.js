const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "product name is required"],
        minLength: 3,
        maxLength: 1000,
        trim: true
    },
    price: {
        type: Number,
        required: [true, "product price is required"]
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0,
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: "{VALUE} is not a supported company"
        }
        // enum: ['ikea', 'liddy', 'caressa', 'marcos']
    }
});


module.exports = mongoose.model("Product", productSchema);