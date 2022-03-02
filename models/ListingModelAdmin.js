const mongoose = require('mongoose');
const listingSchema = new mongoose.Schema({



    listing_title: {
        type: String,
        required: true,

    },
    listing_id:{
        type: String,
        required: true,
        unique:true,
    },
    description: {
        type: String,
        required: true,
        maxLength: 1000,
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
        match: [/^[A-Za-z]+$/]
    },
    postal_code: {
        type: String,
        required: true,
        match: [/^[A-Z]\d[A-Z][ -]?\d[A-Z]\d$/]
    },
    price:{
        type:Number,
        required: true,
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    }


})

module.exports = mongoose.model('ListingAdmin', listingSchema);