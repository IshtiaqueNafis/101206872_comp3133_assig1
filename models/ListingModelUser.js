const mongoose = require('mongoose');

const listUserSchema = new mongoose.Schema({
    booking_date: {
        type: Date,
        required: true
    },
    booking_start: {
        type: Date,
        required: true
    },
    booking_end: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    }


})

module.exports = mongoose.model('UserBookingList', listUserSchema);