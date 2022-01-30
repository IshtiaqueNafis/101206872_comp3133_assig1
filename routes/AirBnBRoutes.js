const express = require('express');
const router = express.Router();
const {getAirBNB} = require('../controllers/airBNBController');

router.route('/')
    .get(getAirBNB);

module.exports = router;