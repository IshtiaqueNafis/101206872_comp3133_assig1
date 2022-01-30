const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

//Route files
const airBNB = require('./routes/AirBnBRoutes');
// load env variables
dotenv.config({path: './config/config.env'});
connectDB()

const app = express();

const logger = (req, res, next) => {
    console.log(`Middle ware ran`);
    next();
}

// dev using middle ware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use('/api/airbnb', airBNB);

app.get('/', (req, res) => {
    res.send('hello');
})

PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));