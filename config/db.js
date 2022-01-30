const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {

        useUnifiedTopology: true
    });

    console.log('Mongo DB connected')
}

module.exports = connectDB;