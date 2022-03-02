const jwt = require('jsonwebtoken')
module.exports.verifyUser = async (req) => {

    try {
        req.email = null;
        const bearterHeader = req.headers.authorization;
        console.log({bearterHeader});
        if (bearterHeader) {
            const token = bearterHeader.split(' ')[1]
            const payload = jwt.verify(token, 'fjafjkafjpiqwwqor-]i12kj2j');
            req.email = payload.email;
        }
    } catch (e) {
        throw e;
    }


}