const jwt = require('jsonwebtoken')

checkToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token);
    try {
        await jwt.verify(token, 'secretkey');
        next();
    } catch (err) {
        console.log(err);
        res.json(err);
    }
}

module.exports.checkToken = checkToken;


