exports.getAirBNB = (req, res, next) => {
    res.status(200).json({success: true, msg: 'Showing all airBNB'});
}