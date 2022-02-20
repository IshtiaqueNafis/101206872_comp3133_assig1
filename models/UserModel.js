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
        match: `/^(([^<>()[\\]\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$/i;`
    },
    type: {
        type: String,
        enum: ['Admin', 'User']
    }


});

//region ***Hashing Password Before saving***
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})
//endregion

//region ***instance method Json WEb Token***
userSchema.methods.getSignedJWTToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE

    });
}
//endregion


module.exports = mongoose.model('User', userSchema);