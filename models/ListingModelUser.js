const mongoose = require('mongoose');

const listUserSchema = new mongoose.Schema({

    listing_id: {
        type:String,
        required:true,
        unique:true,
    },
    booking_id:{
        type:String,
        required:true,
        unique:true,
    },

    booking_date: {
        type: String,
        required: true
    },
    booking_start: {
        type: String,
        required: true
    },
    booking_end: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },



})

module.exports = mongoose.model('UserBookingList', listUserSchema);