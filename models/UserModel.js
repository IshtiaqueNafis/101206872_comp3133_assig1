const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({



    username: {
        type: String,
        required: [true, `Please add a user name`],
        unique: true,
    },
    firstname: {
        type: String,
        required: [true, `Please add a user first name`],
    },
    lastname: {
        type: String,
        required: [true, `Please add a user first name`],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false,
    },
    email: {
        type: String,
        required: [true, `Please add a email`],
        unique: true,
        match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/]
    },
    type: {
        type: String,
        enum: ['Admin', 'User']
    }


});




module.exports = mongoose.model('User', userSchema);